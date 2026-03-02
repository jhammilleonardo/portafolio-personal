import React, { useState, useEffect, useRef } from 'react';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import type { Profile } from '../../types';

const inputClass = "w-full px-4 py-3 rounded-xl bg-bg border border-border text-text placeholder-text-muted focus:outline-none focus:border-text transition-all duration-200 text-sm";
const labelClass = "block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wide";

const DAYS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export function ProfileManager() {
  const [profile, setProfile] = useState<Partial<Profile>>({});
  const [availabilityList, setAvailabilityList] = useState<{day: string, start: string, end: string, active: boolean}[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [saving, setSaving] = useState(false);
  
  // Image Crop states
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState<Crop>({ unit: '%', width: 50, height: 50, x: 25, y: 25 });
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    fetch('/api/admin/profile')
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setProfile(data);
          try {
            const parsed = JSON.parse(data.availability || '[]');
            if (Array.isArray(parsed) && parsed.length > 0) {
              setAvailabilityList(DAYS.map(d => {
                const existing = parsed.find((p: any) => p.day === d);
                if (existing && existing.start && existing.end) {
                  return { ...existing, active: true };
                } else if (existing && existing.hours) {
                   const parts = existing.hours.split('-');
                   return { 
                     day: d, 
                     start: parts[0]?.trim() || '09:00', 
                     end: parts[1]?.trim() || '18:00', 
                     active: true 
                   };
                }
                return { day: d, start: '09:00', end: '18:00', active: false };
              }));
            } else {
              setAvailabilityList(DAYS.map(d => ({day: d, start: '09:00', end: '18:00', active: false})));
            }
          } catch (e) {
            setAvailabilityList(DAYS.map(d => ({day: d, start: '09:00', end: '18:00', active: false})));
          }
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleDayChange = (index: number, field: 'start' | 'end' | 'active', value: string | boolean) => {
    const newList = [...availabilityList];
    newList[index] = { ...newList[index], [field]: value };
    setAvailabilityList(newList);
  };

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop({ unit: '%', width: 50, height: 50, x: 25, y: 25 }); // Reset crop
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgSrc(reader.result?.toString() || '');
        setShowCropModal(true);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const uploadCroppedImage = async () => {
    if (!completedCrop || !imgRef.current) return;

    const canvas = document.createElement('canvas');
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    // Convertir directamente a Base64 y guardar en BD (sin sistema de archivos)
    const base64 = canvas.toDataURL('image/jpeg', 0.85);
    setUploading(true);
    setShowCropModal(false);
    try {
      setProfile(prev => ({ ...prev, avatar_url: base64 }));
      setMsg('Imagen lista. Guarda el perfil para confirmar.');
    } catch (error) {
      console.error(error);
      setMsg('Error al procesar imagen');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setTimeout(() => setMsg(''), 4000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const activeDays = availabilityList.filter(d => d.active).map(d => ({
      day: d.day,
      hours: `${d.start} - ${d.end}`,
      start: d.start,
      end: d.end
    }));

    const updatedProfile = { ...profile, availability: JSON.stringify(activeDays) };
    
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProfile),
      });
      const data = await res.json();
      setMsg(data.message || data.error);
      setTimeout(() => setMsg(''), 3000);
    } catch (error) {
      setMsg('Error al guardar cambios');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-12 text-center text-text-muted">Cargando perfil...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-text font-grotesk">Perfil Personal</h1>
        <p className="text-text-muted mt-2">Gestiona tu información personal y cómo te ven los demás.</p>
      </div>

      {msg && (
        <div className={`mb-8 px-4 py-3 rounded-xl text-sm border flex items-center gap-2 ${msg.includes('Error') ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600'}`}>
          {msg}
        </div>
      )}

      {/* Modal para Recortar Imagen */}
      {showCropModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-bg border border-border rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="text-lg font-bold text-text mb-4">Recortar Imagen</h3>
            <div className="flex justify-center bg-surface border border-border rounded-xl p-4 mb-6">
              <ReactCrop
                crop={crop}
                onChange={c => setCrop(c)}
                onComplete={c => setCompletedCrop(c)}
                aspect={1}
                circularCrop
              >
                <img 
                  ref={imgRef}
                  src={imgSrc} 
                  alt="Crop preview" 
                  style={{ maxHeight: '50vh', objectFit: 'contain' }}
                />
              </ReactCrop>
            </div>
            <div className="flex justify-end gap-3">
              <button 
                type="button"
                onClick={() => {
                  setShowCropModal(false);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="px-5 py-2.5 rounded-xl text-sm font-medium border border-border hover:bg-surface transition-all text-text"
              >
                Cancelar
              </button>
              <button 
                type="button"
                onClick={uploadCroppedImage}
                className="px-5 py-2.5 rounded-xl text-sm font-bold bg-text text-bg hover:opacity-90 transition-all shadow-lg"
              >
                Recortar y Subir
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-3xl p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Avatar */}
          <div className="col-span-full">
            <label className={labelClass}>Avatar</label>
            <div className="flex items-center gap-6 mt-2">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-bg border border-border flex items-center justify-center shrink-0 shadow-sm">
                {profile.avatar_url ? (
                  <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-text-muted text-xs">Sin foto</span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={onSelectFile}
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-text text-bg hover:opacity-90 transition-all shadow-sm"
                  >
                    {uploading ? 'Subiendo...' : 'Subir nueva foto'}
                  </button>
                  {profile.avatar_url && (
                    <button
                      type="button"
                      onClick={() => setProfile(p => ({ ...p, avatar_url: null }))}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
                    >
                      Eliminar
                    </button>
                  )}
                </div>
                <p className="text-xs text-text-muted">JPG, PNG o WEBP. Podrás recortar la imagen antes de subirla.</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <label className={labelClass}>Nombre Completo</label>
            <input
              type="text"
              name="name"
              value={profile.name || ''}
              onChange={handleChange}
              className={inputClass}
              placeholder="Tu Nombre"
              required
            />
          </div>

          <div className="md:col-span-1">
            <label className={labelClass}>Título Profesional</label>
            <input
              type="text"
              name="title"
              value={profile.title || ''}
              onChange={handleChange}
              className={inputClass}
              placeholder="Full Stack Developer"
              required
            />
          </div>

          <div className="col-span-full">
            <label className={labelClass}>Biografía</label>
            <textarea
              name="bio"
              value={profile.bio || ''}
              onChange={handleChange}
              className={`${inputClass} min-h-[120px] resize-y`}
              placeholder="Breve descripción sobre ti..."
            />
          </div>

          <div className="md:col-span-1">
            <label className={labelClass}>Email</label>
            <input
              type="email"
              name="email"
              value={profile.email || ''}
              onChange={handleChange}
              className={inputClass}
              placeholder="tu@email.com"
            />
          </div>

          <div className="md:col-span-1">
            <label className={labelClass}>Ubicación</label>
            <input
              type="text"
              name="location"
              value={profile.location || ''}
              onChange={handleChange}
              className={inputClass}
              placeholder="Ciudad, País"
            />
          </div>

           <div className="md:col-span-1">
            <label className={labelClass}>Años de Experiencia</label>
            <input
              type="number"
              name="years_experience"
              value={profile.years_experience || 0}
              onChange={handleChange}
              className={inputClass}
              min="0"
            />
          </div>
        </div>

        <div className="h-px bg-border my-8"></div>
        
        <h3 className="text-lg font-bold text-text mb-2 font-grotesk">Disponibilidad (Horarios)</h3>
        <p className="text-sm text-text-muted mb-6">Activa los días que estás disponible y configura tu horario usando el selector de tiempo.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {availabilityList.map((item, idx) => (
             <div key={idx} className={`flex flex-col p-5 rounded-2xl border ${item.active ? 'border-border bg-bg shadow-sm' : 'border-dashed border-border/50 opacity-60'} transition-all duration-300`}>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-bold text-text">{item.day}</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={item.active}
                      onChange={(e) => handleDayChange(idx, 'active', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-border rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-text"></div>
                  </label>
                </div>
                
                <div className={`grid grid-cols-2 gap-3 transition-opacity duration-300 ${item.active ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  <div className="flex flex-col">
                    <label className="text-[10px] uppercase tracking-wider text-text-muted mb-1.5 font-semibold">Desde</label>
                    <input 
                      type="time"
                      value={item.start}
                      onChange={e => handleDayChange(idx, 'start', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-text focus:outline-none focus:border-text transition-all duration-200 text-sm font-medium"
                      disabled={!item.active}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] uppercase tracking-wider text-text-muted mb-1.5 font-semibold">Hasta</label>
                    <input 
                      type="time"
                      value={item.end}
                      onChange={e => handleDayChange(idx, 'end', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-text focus:outline-none focus:border-text transition-all duration-200 text-sm font-medium"
                      disabled={!item.active}
                    />
                  </div>
                </div>
             </div>
          ))}
        </div>

        <div className="h-px bg-border my-8"></div>

        <h3 className="text-lg font-bold text-text mb-6 font-grotesk">Redes Sociales</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className={labelClass}>GitHub URL</label>
            <input
              type="text"
              name="github_url"
              value={profile.github_url || ''}
              onChange={handleChange}
              className={inputClass}
              placeholder="https://github.com/..."
            />
          </div>
          <div>
            <label className={labelClass}>LinkedIn URL</label>
            <input
              type="text"
              name="linkedin_url"
              value={profile.linkedin_url || ''}
              onChange={handleChange}
              className={inputClass}
              placeholder="https://linkedin.com/in/..."
            />
          </div>
          <div>
            <label className={labelClass}>Twitter / X URL</label>
            <input
              type="text"
              name="twitter_url"
              value={profile.twitter_url || ''}
              onChange={handleChange}
              className={inputClass}
              placeholder="https://twitter.com/..."
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-border">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 rounded-xl text-sm font-bold text-bg bg-text hover:opacity-90 transition-all shadow-lg shadow-text/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </form>

      <div className="mt-12 bg-surface border border-border rounded-3xl p-8 shadow-sm">
        <h3 className="text-lg font-bold text-text mb-2 font-grotesk">Seguridad</h3>
        <p className="text-sm text-text-muted mb-6">Cambia la contraseña de acceso a tu panel de administrador.</p>
        
        <form onSubmit={async (e) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
            newPassword: { value: string };
          };
          const newPassword = target.newPassword.value;
          
          if (newPassword.length < 6) {
            setMsg('Error: La contraseña debe tener al menos 6 caracteres.');
            return;
          }

          setSaving(true);
          try {
            const res = await fetch('/api/admin/password', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ newPassword }),
            });
            const data = await res.json();
            setMsg(data.message || data.error);
            target.newPassword.value = '';
          } catch (error) {
            setMsg('Error al actualizar contraseña');
          } finally {
            setSaving(false);
            setTimeout(() => setMsg(''), 3000);
          }
        }} className="flex items-end gap-4 max-w-md">
          <div className="flex-1">
            <label className={labelClass}>Nueva Contraseña</label>
            <input
              type="password"
              name="newPassword"
              className={inputClass}
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl text-sm font-bold text-bg bg-text hover:opacity-90 transition-all shadow-sm disabled:opacity-50"
          >
            Actualizar
          </button>
        </form>
      </div>
    </div>
  );
}
