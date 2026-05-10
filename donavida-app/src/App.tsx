// App.tsx - Versión con EmailJS funcional
import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './App.css';

const App: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    message: ''
  });
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // 🔴 ¡¡¡REEMPLAZA ESTOS 3 VALORES con los de EmailJS!!! 🔴
  const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || '';
  const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '';
  const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || '';

  const handleLogin = () => {
    alert("🔐 Acceso a plataforma Dona Vida.\n(Página de inicio de sesión disponible próximamente)");
  };

  const handleContactPlan = (plan: string) => {
    const contactoSection = document.getElementById('contacto');
    if (contactoSection) {
      contactoSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        alert(`📋 Plan ${plan} - Completa el formulario y te contactaremos para personalizar tu suscripción (mensual o anual) con un precio adaptado a tu institución.`);
      }, 500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones
    if (!formData.name || !formData.email || !formData.message) {
      alert("Por favor completa los campos obligatorios (nombre, correo y mensaje).");
      return;
    }
    if (!formData.email.includes('@')) {
      alert("Correo electrónico no válido.");
      return;
    }

    setIsLoading(true);

    try {

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        institution: formData.institution || 'No especificada',
        message: formData.message,
        time: new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })
      };


      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        setFeedback('✅ ¡Mensaje enviado con éxito! Te contactaremos en las próximas 24 horas.');
        setFormData({ name: '', email: '', institution: '', message: '' });
        

        if (formRef.current) {
          formRef.current.reset();
        }
      } else {
        throw new Error('Error al enviar');
      }
    } catch (error) {
      console.error('Error:', error);
      setFeedback('❌ Error al enviar el mensaje. Por favor, intenta de nuevo o contáctanos directamente a donavidasoporte@gmail.com');
    } finally {
      setIsLoading(false);
      setTimeout(() => { setFeedback(''); }, 5000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElem = document.querySelector(targetId);
    if (targetElem) {
      targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };


  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <header>
        <div className="container">
          <div className="navbar">
            <div className="logo-img" style={{ fontSize: '15px', fontWeight: 'bold', color: '#9B0800' }}>
              <img src="/img/DonaVida3.png" alt="Dona Vida" className="logo-img" style={{ width: '220px', height: 'auto' }}/>
            </div>
            <div className="nav-links">
              <a href="#que-es" onClick={(e) => handleNavClick(e, '#que-es')}>Qué es</a>
              <a href="#suscripciones" onClick={(e) => handleNavClick(e, '#suscripciones')}>Planes</a>
              <a href="#contacto" onClick={(e) => handleNavClick(e, '#contacto')}>Contacto</a>
              <button className="btn-login" onClick={handleLogin}>
                <i className="fas fa-sign-in-alt"></i> Iniciar sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container">
          <div className="hero hero-with-bg-image">
            <div className="hero-content">
              <div className="hero-badge">
                <i className="fas fa-heartbeat"></i> Hecho para instituciones
              </div>
              <h1>
                Uniendo Puntos, <span className="highlight">Salvando</span> vidas.
              </h1>
              <p>Plataforma digital diseñada para hospitales, bancos de sangre y organizaciones sociales. Conecta donantes voluntarios con quienes más lo necesitan, con herramientas accesibles y en tiempo real.</p>
              <button className="btn-login-hero" onClick={handleLogin}>
                Comenzar ahora →
              </button>
            </div>
            <div className="hero-image">
              <svg viewBox="0 0 300 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="150" cy="120" r="90" fill="rgba(255,255,255,0.2)" />
                <path d="M120 110 L170 110 L170 130 L120 130 Z" fill="white" />
                <circle cx="150" cy="145" r="28" fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="2" />
                <path d="M150 125 L150 165 M135 145 L165 145" stroke="white" strokeWidth="3" strokeLinecap="round" />
                <path d="M80 180 L220 180" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeDasharray="6 6" />
              </svg>
            </div>
          </div>
        </div>

        <section id="que-es">
          <div className="container">
            <div className="section-title">
              ¿Qué es <img src="/img/DonaVida2.png" alt="Dona Vida" className="logo-img" style={{ width: '200px', height: 'auto' }}/>?
            </div>
            <div className="section-sub">Más que una plataforma, un movimiento que impulsa la generosidad y el apoyo mutuo.</div>

            <div className="about-red-card">
              <div className="about-grid">
                <div className="about-text">
                  <h3>Transformamos la ayuda en conexiones reales</h3>
                  <p>Dona Vida es un ecosistema digital donde personas altruistas, voluntarios y fundaciones se encuentran para generar un cambio positivo. Facilitamos la comunicación, la donación inteligente y el seguimiento de causas sociales en tiempo real.</p>
                  <p>Con tecnología transparente y un enfoque humano, estamos listos para ayudar a organizaciones y personas a potenciar su impacto. Nuestra meta es iniciar con 10 instituciones en Oaxaca y crecer desde ahí.</p>
                </div>
                <div className="about-icon">
                  <i className="fas fa-hands-helping"></i>
                  <i className="fas fa-users"></i>
                  <i className="fas fa-leaf"></i>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="suscripciones">
          <div className="container">
            <div className="section-title">Planes para instituciones</div>
            <div className="section-sub">
              Diseñamos soluciones a medida para fundaciones, ONGs y organizaciones sociales.<br />
              <strong>💰 Precios personalizables · 📅 Pago mensual o anual · 🤝 Negociamos según tu tamaño</strong>
            </div>
            <div className="pricing-cards">
              <div className="card">
                <h3>🏥 Esencial</h3>
                <div className="price">
                  $10,000 <span>/ mes</span>
                </div>
                <div className="price-annual">
                  o $94,000 <span>/ año (ahorra 22%)</span>
                </div>
                <div className="card-descripcion">
                  Ideal para hospitales pequeños o en fase inicial
                </div>
                <ul className="features">
                  <li><i className="fas fa-check-circle"></i> Soporte técnico incluido</li>
                  <li><i className="fas fa-check-circle"></i> 1 Super Usuario</li>
                  <li><i className="fas fa-check-circle"></i> 3 Usuarios Staff</li>
                  <li><i className="fas fa-check-circle"></i> 10 GB almacenamiento en la nube</li>
                </ul>
                <button className="btn-plan" onClick={() => handleContactPlan('Esencial')}>
                  📩 Solicitar cotización
                </button>
              </div>

              <div className="card popular">
                <div className="popular-badge">RECOMENDADO</div>
                <h3>🚀 Profesional</h3>
                <div className="price">
                  $14,000 <span>/ mes</span>
                </div>
                <div className="price-annual">
                  o $131,600 <span>/ año (ahorra 22%)</span>
                </div>
                <div className="card-descripcion">
                  Para hospitales con mayor operación y demanda
                </div>
                <ul className="features">
                  <li><i className="fas fa-check-circle"></i> Soporte prioritario</li>
                  <li><i className="fas fa-check-circle"></i> 3 Súper Usuarios</li>
                  <li><i className="fas fa-check-circle"></i> 7 Usuarios Staff</li>
                  <li><i className="fas fa-check-circle"></i> 20 GB almacenamiento en la nube</li>
                </ul>
                <button className="btn-plan primary" onClick={() => handleContactPlan('Profesional')}>
                  📩 Solicitar cotización
                </button>
              </div>
            </div>

            <div className="negociacion-box">
              <i className="fas fa-handshake"></i>
              <strong>¿Eres una institución pequeña o estás empezando?</strong>
              <p>Contáctanos y encontraremos un precio justo para tu realidad. Creemos en el impacto social sin barreras económicas.<br />Adaptamos la modalidad de pago: mensual o anual, como prefieras.</p>
            </div>
          </div>
        </section>

        <section id="contacto">
          <div className="container">
            <div className="section-title">¿Tienes preguntas?</div>
            <div className="section-sub">Escríbenos y nuestro equipo de ayuda te responderá a la brevedad.</div>
            <div className="contact-wrapper">
              <div className="contact-info">
                <h3><i className="fas fa-envelope-open-text"></i> Hablemos</h3>
                <div className="contact-detail">
                  <i className="fas fa-phone-alt"></i>
                  <span>+52 951 123 4567</span>
                </div>
                <div className="contact-detail">
                  <i className="fas fa-clock"></i>
                  <span>Lun - Vie: 9am a 6pm (horario extendido online)</span>
                </div>
                <div className="contact-detail">
                  <i className="fas fa-globe"></i>
                  <span>donavidasoporte@gmail.com</span>
                </div>
              </div>
              <div className="contact-form">
                <form ref={formRef} onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Nombre completo *"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="Correo electrónico *"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Nombre de tu institución"
                      id="institution"
                      value={formData.institution}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      rows={4}
                      placeholder="Cuéntanos cómo podemos ayudarte o qué plan te interesa... *"
                      id="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn-submit" disabled={isLoading}>
                    {isLoading ? (
                      <>Enviando... <i className="fas fa-spinner fa-spin"></i></>
                    ) : (
                      <>Enviar mensaje <i className="fas fa-paper-plane"></i></>
                    )}
                  </button>
                </form>
                {feedback && (
                  <div style={{ 
                    marginTop: '16px', 
                    fontSize: '0.9rem', 
                    color: feedback.includes('✅') ? '#2ecc71' : '#9B0800', 
                    background: feedback.includes('✅') ? '#e8f8f5' : '#fef1ef', 
                    padding: '12px 16px', 
                    borderRadius: '60px', 
                    textAlign: 'center',
                    fontWeight: '500'
                  }}>
                    {feedback}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#9B0800' }}>
              <img src="/img/DonaVida3.png" alt="Dona Vida" className="logo-img" style={{ width: '250px', height: 'auto' }}/>
            </div>
            <div className="social">
              <i className="fab fa-instagram"></i>
              <i className="fab fa-facebook"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-linkedin"></i>
            </div>
          </div>
          <div className="copyright">
            © 2026 Dona Vida - Uniendo puntos, salvando vidas. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;