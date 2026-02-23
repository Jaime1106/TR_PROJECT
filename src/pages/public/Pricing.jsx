import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Pricing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingPeriod, setBillingPeriod] = useState('mensual'); // mensual o anual

  const plans = [
    {
      id: 'basico',
      name: 'Básico',
      price: {
        mensual: 29900,
        anual: 287000 // 20% descuento
      },
      features: [
        'Hasta 30 consultas por mes',
        'Calendario básico',
        'Recordatorios por email',
        'Soporte por email'
      ],
      color: '#6b7280',
      recommended: false
    },
    {
      id: 'profesional',
      name: 'Profesional',
      price: {
        mensual: 59900,
        anual: 575000 // 20% descuento
      },
      features: [
        'Consultas ilimitadas',
        'Calendario personalizado',
        'Recordatorios SMS + email',
        'Exportar a PDF/Excel',
        'Soporte prioritario 24/7',
        'Múltiples NITs'
      ],
      color: '#1e3a8a',
      recommended: true
    },
    {
      id: 'empresarial',
      name: 'Empresarial',
      price: {
        mensual: 99900,
        anual: 959000 // 20% descuento
      },
      features: [
        'Todo lo del plan Profesional',
        'API de consultas',
        'Usuarios ilimitados',
        'Reportes avanzados',
        'Soporte telefónico',
        'Capacitación personalizada'
      ],
      color: '#7e22ce',
      recommended: false
    }
  ];

  const handleSelectPlan = (planId) => {
    if (!user) {
      // Si no está autenticado, redirigir al registro con el plan seleccionado
      navigate('/register', { state: { selectedPlan: planId, billingPeriod } });
    } else {
      // Si está autenticado, ir al checkout
      navigate('/checkout', { state: { planId, billingPeriod } });
    }
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '2rem auto',
    padding: '0 2rem'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '3rem'
  };

  const titleStyle = {
    color: '#1e3a8a',
    fontSize: '2.5rem',
    marginBottom: '1rem'
  };

  const subtitleStyle = {
    color: '#6b7280',
    fontSize: '1.2rem',
    maxWidth: '600px',
    margin: '0 auto'
  };

  const toggleStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '3rem'
  };

  const toggleButtonStyle = (active) => ({
    padding: '0.75rem 2rem',
    backgroundColor: active ? '#1e3a8a' : 'white',
    color: active ? 'white' : '#4b5563',
    border: active ? 'none' : '2px solid #e5e7eb',
    borderRadius: '30px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: active ? 'bold' : 'normal',
    transition: 'all 0.3s'
  });

  const discountBadgeStyle = {
    backgroundColor: '#10b981',
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    marginLeft: '1rem'
  };

  const plansGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem'
  };

  const planCardStyle = (plan) => ({
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '2rem',
    boxShadow: plan.recommended 
      ? '0 10px 25px -5px rgba(30, 58, 138, 0.3)' 
      : '0 4px 6px rgba(0,0,0,0.1)',
    border: plan.recommended ? '2px solid #1e3a8a' : 'none',
    position: 'relative',
    transition: 'transform 0.3s'
  });

  const recommendedBadgeStyle = {
    position: 'absolute',
    top: '-12px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#1e3a8a',
    color: 'white',
    padding: '0.25rem 1rem',
    borderRadius: '20px',
    fontSize: '0.875rem',
    fontWeight: 'bold'
  };

  const planNameStyle = {
    fontSize: '1.5rem',
    color: '#1f2937',
    marginBottom: '0.5rem'
  };

  const priceStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: '0.5rem'
  };

  const pricePeriodStyle = {
    color: '#6b7280',
    fontSize: '0.9rem',
    marginBottom: '1.5rem'
  };

  const featuresListStyle = {
    listStyle: 'none',
    padding: 0,
    marginBottom: '2rem'
  };

  const featureItemStyle = {
    padding: '0.5rem 0',
    color: '#4b5563',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const buttonStyle = (plan) => ({
    width: '100%',
    padding: '0.75rem',
    backgroundColor: plan.recommended ? '#1e3a8a' : 'white',
    color: plan.recommended ? 'white' : '#1e3a8a',
    border: plan.recommended ? 'none' : '2px solid #1e3a8a',
    borderRadius: '5px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s'
  });

  const faqSectionStyle = {
    marginTop: '4rem',
    padding: '2rem',
    backgroundColor: '#f8fafc',
    borderRadius: '10px'
  };

  const faqTitleStyle = {
    color: '#1e3a8a',
    fontSize: '1.5rem',
    marginBottom: '2rem',
    textAlign: 'center'
  };

  const faqGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem'
  };

  const faqItemStyle = {
    padding: '1rem'
  };

  const faqQuestionStyle = {
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: '0.5rem'
  };

  const faqAnswerStyle = {
    color: '#6b7280',
    lineHeight: '1.6'
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Planes y Membresías</h1>
        <p style={subtitleStyle}>
          Elige el plan que mejor se adapte a tus necesidades. 
          Todos los planes incluyen acceso a los calendarios tributarios actualizados.
        </p>
      </div>

      {/* Toggle mensual/anual */}
      <div style={toggleStyle}>
        <button
          style={toggleButtonStyle(billingPeriod === 'mensual')}
          onClick={() => setBillingPeriod('mensual')}
        >
          Mensual
        </button>
        <button
          style={toggleButtonStyle(billingPeriod === 'anual')}
          onClick={() => setBillingPeriod('anual')}
        >
          Anual
          <span style={discountBadgeStyle}>Ahorra 20%</span>
        </button>
      </div>

      {/* Grid de planes */}
      <div style={plansGridStyle}>
        {plans.map(plan => (
          <div
            key={plan.id}
            style={planCardStyle(plan)}
            onMouseEnter={(e) => {
              if (!plan.recommended) {
                e.currentTarget.style.transform = 'translateY(-5px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!plan.recommended) {
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            {plan.recommended && (
              <div style={recommendedBadgeStyle}>
                ⭐ Recomendado
              </div>
            )}
            
            <h3 style={planNameStyle}>{plan.name}</h3>
            <div style={priceStyle}>
              {formatPrice(plan.price[billingPeriod])}
            </div>
            <div style={pricePeriodStyle}>
              {billingPeriod === 'mensual' ? 'por mes' : 'por año'}
            </div>

            <ul style={featuresListStyle}>
              {plan.features.map((feature, index) => (
                <li key={index} style={featureItemStyle}>
                  <span style={{ color: '#10b981' }}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              style={buttonStyle(plan)}
              onClick={() => handleSelectPlan(plan.id)}
              onMouseEnter={(e) => {
                if (plan.recommended) {
                  e.target.style.backgroundColor = '#2563eb';
                } else {
                  e.target.style.backgroundColor = '#1e3a8a';
                  e.target.style.color = 'white';
                }
              }}
              onMouseLeave={(e) => {
                if (plan.recommended) {
                  e.target.style.backgroundColor = '#1e3a8a';
                } else {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.color = '#1e3a8a';
                }
              }}
            >
              {user ? 'Contratar ahora' : 'Comenzar prueba gratuita'}
            </button>
          </div>
        ))}
      </div>

      {/* Sección de preguntas frecuentes */}
      <div style={faqSectionStyle}>
        <h2 style={faqTitleStyle}>Preguntas Frecuentes</h2>
        <div style={faqGridStyle}>
          <div style={faqItemStyle}>
            <p style={faqQuestionStyle}>¿Puedo cambiar de plan después?</p>
            <p style={faqAnswerStyle}>
              Sí, puedes actualizar o cambiar tu plan en cualquier momento. 
              El cambio se aplicará inmediatamente.
            </p>
          </div>
          <div style={faqItemStyle}>
            <p style={faqQuestionStyle}>¿Ofrecen facturación?</p>
            <p style={faqAnswerStyle}>
              Sí, todos nuestros planes incluyen facturación con NIT. 
              Puedes solicitar tu factura en el panel de control.
            </p>
          </div>
          <div style={faqItemStyle}>
            <p style={faqQuestionStyle}>¿Hay período de prueba?</p>
            <p style={faqAnswerStyle}>
              Ofrecemos 3 consultas gratuitas sin necesidad de registro 
              para que pruebes la plataforma.
            </p>
          </div>
          <div style={faqItemStyle}>
            <p style={faqQuestionStyle}>¿Qué métodos de pago aceptan?</p>
            <p style={faqAnswerStyle}>
              Aceptamos tarjetas de crédito, débito, PSE y transferencias bancarias.
            </p>
          </div>
        </div>
      </div>

      {/* Llamada a la acción final */}
      <div style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '2rem' }}>
        <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
          ¿Tienes dudas? Contáctanos para una asesoría personalizada
        </p>
        <Link 
          to="/contact"
          style={{
            color: '#1e3a8a',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '1.1rem'
          }}
        >
          📞 Hablar con un asesor
        </Link>
      </div>
    </div>
  );
};

export default Pricing;