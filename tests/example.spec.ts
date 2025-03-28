import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

//Test para saber si se inicia sesion bien
test('Inicio de sesion valido', async ({ page }) => {
  const URL1 = process.env.UCP_URL1;
  const URL2 = process.env.UCP_URL2;
  const usuario = process.env.UCP_USER;
  const password = process.env.UCP_PASS;

  //Verificar si las variables de entorno estan vacias
  if (!URL1 || !URL2 || !usuario || !password) {
    throw new Error('Faltan variables de entorno en el archivo .env');
  }

  await page.goto(URL1);

  //Espero a que los campos de Usuario y contraseña esten visibles y los completo con mis credenciales secretas
  await page.waitForSelector('#ctl00_ContentPlaceHolder1_TextBox1', { state: 'visible' });
  await page.fill('#ctl00_ContentPlaceHolder1_TextBox1', usuario);

  await page.waitForSelector('#ctl00_ContentPlaceHolder1_Clave', { state: 'visible' });
  await page.fill('#ctl00_ContentPlaceHolder1_Clave', password);

  // Esperar a que el botón esté visible y hacer clic
  await page.waitForSelector('#ctl00_ContentPlaceHolder1_ImageButton1', { state: 'visible' });
  await page.locator('#ctl00_ContentPlaceHolder1_ImageButton1').click();

  // Verificar la URL final osea que cambio de pagina
  await expect(page).toHaveURL(URL2);

  // Revisar que aparezca mi informacion
  await page.waitForSelector('#ctl00_Label1', { state: 'visible' });
  await expect(page.locator('#ctl00_Label1')).toHaveText(/Cabrera, Ivan Gonzalo/);
});

//Test 1 para saber si se muestra el mensaje de error
test('Inicio de sesion invalido 1', async ({ page }) => {

  const URL1 = process.env.UCP_URL1;

  //Verificar si las variables de entorno estan vacias
  if (!URL1) {
    throw new Error('Faltan variables de entorno en el archivo .env');
  }

  await page.goto(URL1);

  //Se espera que sea visible el bloque de texto y se escribe un usuario incorrecto
  await page.waitForSelector('#ctl00_ContentPlaceHolder1_TextBox1', { state: 'visible' });
  await page.fill('#ctl00_ContentPlaceHolder1_TextBox1', '666');

  //Se espera que sea visible el bloque de texto y se escribe una contraseña incorrecta
  await page.waitForSelector('#ctl00_ContentPlaceHolder1_Clave', { state: 'visible' });
  await page.fill('#ctl00_ContentPlaceHolder1_Clave','demo');

  // Esperar a que el botón esté visible y hacer clic
  await page.waitForSelector('#ctl00_ContentPlaceHolder1_ImageButton1', { state: 'visible' });
  await page.locator('#ctl00_ContentPlaceHolder1_ImageButton1').click();

  // Verificar el mensaje de error
  await expect(page.locator('#ctl00_ContentPlaceHolder1_Label2')).toBeVisible();
  await expect(page.locator('#ctl00_ContentPlaceHolder1_Label2')).toHaveText(/usuario y clave no coincide/);


});

//Test 2 para saber si se muestra el mensaje de error
test('Inicio de sesion invalido 2', async ({ page }) => {

  const URL1 = process.env.UCP_URL1;

  //Verificar si las variables de entorno estan vacias
  if (!URL1) {
    throw new Error('Faltan variables de entorno en el archivo .env');
  }

  await page.goto(URL1);

  //Se espera que sea visible el bloque de texto y se escribe un usuario incorrecto
  await page.waitForSelector('#ctl00_ContentPlaceHolder1_TextBox1', { state: 'visible' });
  await page.fill('#ctl00_ContentPlaceHolder1_TextBox1', 'abc');

  //Se espera que sea visible el bloque de texto y se escribe una contraseña incorrecta
  await page.waitForSelector('#ctl00_ContentPlaceHolder1_Clave', { state: 'visible' });
  await page.fill('#ctl00_ContentPlaceHolder1_Clave','demo');

  // Esperar a que el botón esté visible y hacer clic
  await page.waitForSelector('#ctl00_ContentPlaceHolder1_ImageButton1', { state: 'visible' });
  await page.locator('#ctl00_ContentPlaceHolder1_ImageButton1').click();

  // Verificar el mensaje de error
  await expect(page.locator('#ctl00_ContentPlaceHolder1_Label2')).toBeVisible();
  await expect(page.locator('#ctl00_ContentPlaceHolder1_Label2')).toHaveText(/usuario y clave no coincide/);
  });
  ///////////////////

  
  test('TEST VALIDO PRUEBA HORARIOS - MATERIAS', async ({ page }) => {

    const URL1 = process.env.UCP_URL1;
    const URL2 = process.env.UCP_URL2;
    const URL3 = process.env.UCP_URL3;
    const usuario = process.env.UCP_USER;
    const password = process.env.UCP_PASS;

  //Verificar si las variables de entorno estan vacias
  if (!URL1 || !URL2 || !usuario || !password || !URL3) {
    throw new Error('Faltan variables de entorno en el archivo .env');
  }
  
  // Caso exitoso credenciales funcionando
  await page.goto(URL1);

  // Esperar que los campos de usuario y contraseña estén visibles
  await page.waitForSelector('input[placeholder="Usuario"]', { state: 'visible' });
  await page.waitForSelector('input[placeholder="Contraseña"]', { state: 'visible' });

  // Llenar usuario y contraseña con las credenciales 
  await page.getByPlaceholder('Usuario').fill(usuario);
  await page.getByPlaceholder('Contraseña').fill(password);
  
  // Hace click en el boton de ingresar
  const botonIngresar = await page.locator('input[name="ctl00$ContentPlaceHolder1$ImageButton1"]'); //Se usa porque input no tiene texto 
  await botonIngresar.click();

  //Se verifica que se redirife correctamente
  await expect(page).toHaveURL(URL2);

  //Se ingresa a cursado
  const botonCursado = await page.locator('#ctl00_PanelCursado_header'); 
  await botonCursado.click();


  // Seleccionar el apartado de "Materias - Horarios - Aulas"
  const materiasLink = await page.locator('a[href="MateriaHorarioAula.aspx?Sel=0"]'); //Se usa href como identificador

  //Hacer click en el apartado 
  await materiasLink.click();  

  //Esperamos que cambie de URL hacia MateriaHorarioAula
  await expect(page).toHaveURL(URL3);

});


test('TEST INVALIDO INGRESO A INASISTENCIA', async ({ page }) => {

  const URL1 = process.env.UCP_URL1;
  const URL2 = process.env.UCP_URL2;
  const URL3 = process.env.UCP_URL4;
  const usuario = process.env.UCP_USER;
  const password = process.env.UCP_PASS;

//Verificar si las variables de entorno estan vacias
if (!URL1 || !URL2 || !usuario || !password || !URL3) {
  throw new Error('Faltan variables de entorno en el archivo .env');
}

  // Caso exitoso credenciales funcionando
  await page.goto(URL1);

  // Esperar que los campos de usuario y contraseña estén visibles
  await page.waitForSelector('input[placeholder="Usuario"]', { state: 'visible' });
  await page.waitForSelector('input[placeholder="Contraseña"]', { state: 'visible' });

  // Llenar usuario y contraseña con las credenciales 
  await page.getByPlaceholder('Usuario').fill(usuario);
  await page.getByPlaceholder('Contraseña').fill(password);
  
  // Hace click en el boton de ingresar
  const botonIngresar = await page.locator('input[name="ctl00$ContentPlaceHolder1$ImageButton1"]'); //Se usa porque input no tiene texto 
  await botonIngresar.click();

  //Se verifica que se redirife correctamente
  await expect(page).toHaveURL(URL2);

  //Se ingresa a cursado
  const botonCursado = await page.locator('#ctl00_PanelCursado_header'); 
  await botonCursado.click();


  //Seleccionar el apartado de "Inasistencias"
  const materiasLink = await page.locator('a[href="Inasistencias.aspx?Sel=1"]'); //Se usa href como identificador

  //Hacer click en el apartado 
  await materiasLink.click();

  //Esperamos que cambie de URL hacia Inasistencias
  await expect(page).toHaveURL(URL3);

  
});


  

