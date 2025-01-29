/******* Este archivo está solamente para diisponer del código para hacer el ataque XSS. No está linkado en ningún fichero HTML *******/

const messageDiv = document.createElement('div');
messageDiv.textContent = 'Has Sido Hackeado';

// Aplicar estilos mediante JSS
Object.assign(messageDiv.style, {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    backgroundColor: 'rgb(0, 0, 0)',
    color: 'green',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
});

// Añadir el div al body
document.body.appendChild(messageDiv);


// Web Storage 

