import mysql from 'mysql2/promise';

const MYSQL_URL = "mysql://root:oKxXHskmMTBgzJtlfNoUrujfYMAiGnKu@ballast.proxy.rlwy.net:40490/railway"; 

async function fixDatabase() {
  try {
    const db = await mysql.createConnection(MYSQL_URL);
    console.log("Conectado a Railway. Iniciando reparación total...");

    // Reparar tabla CERTIFICATIONS
    const certQueries = [
      "ALTER TABLE certifications ADD COLUMN IF NOT EXISTS title VARCHAR(255);",
      "ALTER TABLE certifications ADD COLUMN IF NOT EXISTS issuer VARCHAR(255);",
      "ALTER TABLE certifications ADD COLUMN IF NOT EXISTS issue_date VARCHAR(100);",
      "ALTER TABLE certifications ADD COLUMN IF NOT EXISTS expiry_date VARCHAR(100);",
      "ALTER TABLE certifications ADD COLUMN IF NOT EXISTS credential_url VARCHAR(255);",
      "ALTER TABLE certifications ADD COLUMN IF NOT EXISTS image_url VARCHAR(255);",
      "ALTER TABLE certifications ADD COLUMN IF NOT EXISTS description TEXT;"
    ];

    // Reparar tabla PROJECTS
    const projectQueries = [
      "ALTER TABLE projects ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;",
      "ALTER TABLE projects ADD COLUMN IF NOT EXISTS tags VARCHAR(255);",
      "ALTER TABLE projects ADD COLUMN IF NOT EXISTS repo_url VARCHAR(255);",
      "ALTER TABLE projects ADD COLUMN IF NOT EXISTS demo_url VARCHAR(255);",
      "ALTER TABLE projects ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'active';"
    ];

    console.log("Actualizando Certificaciones...");
    for (let q of certQueries) await db.query(q).catch(() => {});
    
    console.log("Actualizando Proyectos...");
    for (let q of projectQueries) await db.query(q).catch(() => {});

    // Crear tabla SKILLS si no existe
    await db.query(`
      CREATE TABLE IF NOT EXISTS skills (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        category VARCHAR(255),
        level INT DEFAULT 0,
        icon VARCHAR(255),
        color VARCHAR(255)
      );
    `).catch(()=>{});

    console.log("¡ÉXITO! Base de datos sincronizada con el código.");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

fixDatabase();
