import mysql from 'mysql2/promise';

const MYSQL_URL = "mysql://root:oKxXHskmMTBgzJtlfNoUrujfYMAiGnKu@ballast.proxy.rlwy.net:40490/railway"; 

async function crearSkills() {
  try {
    console.log("Conectando a Railway...");
    const db = await mysql.createConnection(MYSQL_URL);

    console.log("Creando tabla de skills que faltaba...");
    await db.query(`
      CREATE TABLE IF NOT EXISTS skills (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        level INT DEFAULT 0,
        icon VARCHAR(255),
        color VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    console.log("¡ÉXITO TOTAL! La tabla skills ha sido creada.");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
  }
}

crearSkills();
