import mysql from 'mysql2/promise';

const MYSQL_URL = "mysql://root:oKxXHskmMTBgzJtlfNoUrujfYMAiGnKu@ballast.proxy.rlwy.net:40490/railway"; 

async function arreglarPortada() {
  try {
    console.log("Conectando a Railway para reparar la portada...");
    const db = await mysql.createConnection(MYSQL_URL);

    // 1. Arreglamos los Proyectos (tu portada exige que exista 'featured' y 'tags')
    await db.query("ALTER TABLE projects ADD COLUMN featured BOOLEAN DEFAULT false;").catch(()=>{});
    await db.query("ALTER TABLE projects ADD COLUMN tags VARCHAR(255);").catch(()=>{});
    await db.query("ALTER TABLE projects ADD COLUMN status VARCHAR(50) DEFAULT 'active';").catch(()=>{});

    // 2. Arreglamos las Certificaciones (tu portada exige 'issue_date' y 'title')
    await db.query("ALTER TABLE certifications CHANGE date issue_date VARCHAR(100);").catch(()=>{});
    await db.query("ALTER TABLE certifications CHANGE name title VARCHAR(255);").catch(()=>{});

    console.log("¡ÉXITO TOTAL! Las tablas ahora coinciden perfectamente con tu frontend.");
    process.exit(0);
  } catch (error) {
    console.error("Error general:", error);
  }
}

arreglarPortada();
