import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/alert';

const PassAntiTabac = () => {
  const [currentView, setCurrentView] = useState('home');
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [cigarettesPerDay, setCigarettesPerDay] = useState('');
  const [yearsSmoked, setYearsSmoked] = useState('');
  const [startedAge, setStartedAge] = useState('');
  const [motivation, setMotivation] = useState('');
  const [motivationDetails, setMotivationDetails] = useState([]);
  const [obstacles, setObstacles] = useState([]);
  const [obstaclesDetails, setObstaclesDetails] = useState('');
  const [firstCigaretteContext, setFirstCigaretteContext] = useState('');
  const [smokeEnvironment, setSmokeEnvironment] = useState([]);
  const [previousAttempts, setPreviousAttempts] = useState('');
  const [healthConcerns, setHealthConcerns] = useState('');
  const [futurVision, setFuturVision] = useState('');
  const [substitutionInterest, setSubstitutionInterest] = useState('');
  const [questionnaireStep, setQuestionnaireStep] = useState(1);

  // Fonction ULTRA SIMPLE pour envoyer les données par email
  const sendQuestionnaireByEmail = () => {
    // Préparer le contenu de l'email
    const subject = `Questionnaire Pass Anti Tabac - ${userName}`;
    
    const body = `
=== NOUVEAU QUESTIONNAIRE PASS ANTI TABAC ===
Date: ${new Date().toLocaleString('fr-FR')}

📋 INFORMATIONS DE BASE
-----------------------
Prénom: ${userName}
Âge: ${userAge} ans
Cigarettes/jour: ${cigarettesPerDay}
Années de tabagisme: ${yearsSmoked} ans
A commencé à: ${startedAge} ans

🎯 MOTIVATIONS
-----------------------
Motivations sélectionnées: ${motivationDetails.join(', ')}

Motivation principale:
${motivation}

🚧 OBSTACLES
-----------------------
Obstacles identifiés: ${obstacles.join(', ')}

Autres difficultés:
${obstaclesDetails || 'Aucune'}

📖 HISTOIRE TABAGIQUE
-----------------------
Contexte de la première cigarette:
${firstCigaretteContext}

Situations où il/elle fume: ${smokeEnvironment.join(', ')}

Tentatives précédentes d'arrêt:
${previousAttempts || 'Aucune tentative'}

Préoccupations de santé:
${healthConcerns || 'Aucune mentionnée'}

🔮 VISION DU FUTUR
-----------------------
Vision de vie non-fumeur:
${futurVision}

Intérêt pour substitution: ${substitutionInterest}

===========================================
    `.trim();

    // Créer le lien mailto
    const mailtoLink = `mailto:hypnosejoffrey@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Ouvrir le client email
    window.location.href = mailtoLink;
    
    // Attendre un peu puis rediriger vers le dashboard
    setTimeout(() => {
      setCurrentView('dashboard');
    }, 1000);
  };
  const [progressData, setProgressData] = useState({
    daysWithout: 0,
    cigarettesAvoided: 0,
    moneySaved: 0,
    exercisesCompleted: []
  });
  const [currentExercise, setCurrentExercise] = useState(null);
  const [breathingActive, setBreathingActive] = useState(false);

  // Animations de respiration
  useEffect(() => {
    const interval = setInterval(() => {
      setBreathingActive(prev => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const exercises = [
    {
      id: 'retarder',
      title: 'Retarder une cigarette de 10 minutes',
      category: 'Prescription de tâche',
      duration: '10 min',
      description: 'Choisissez la cigarette la plus importante de la journée. Attendez 10 minutes avant de l\'allumer. Ni trop courte, ni trop longue.',
      icon: '⏱️',
      steps: [
        'Choisissez votre cigarette la plus habituelle',
        'Notez l\'heure actuelle',
        'Attendez exactement 10 minutes',
        'Observez vos sensations sans jugement',
        'Vous êtes libre de fumer après ou de prolonger'
      ]
    },
    {
      id: 'fantasme',
      title: 'Le fantasme de la consommation',
      category: 'Autohypnose',
      duration: '15 min',
      description: 'Vivez mentalement l\'expérience de fumer sans allumer de cigarette. Imaginez chaque détail sensoriel.',
      icon: '🧠',
      steps: [
        'Installez-vous confortablement',
        'Fermez les yeux et respirez profondément',
        'Imaginez prendre une cigarette',
        'Visualisez l\'allumer en détail',
        'Sentez le goût du tabac dans votre bouche',
        'Ressentez le passage de la fumée',
        'Prenez une autre bouffée mentale',
        'Imaginez la consommation jusqu\'au bout',
        'Observez : ressentez-vous un changement ?'
      ]
    },
    {
      id: 'rupture',
      title: 'La lettre de rupture',
      category: 'Expression émotionnelle',
      duration: '20 min',
      description: 'Écrivez à la cigarette comme à une relation toxique dont vous vous séparez.',
      icon: '✉️',
      steps: [
        'Prenez une feuille et un stylo',
        'Adressez votre lettre à "La cigarette"',
        'Décrivez ce qu\'elle vous a apporté',
        'Exprimez le gêne qu\'elle crée maintenant',
        'Expliquez pourquoi vous vous séparez',
        'Décrivez comment sera votre vie sans elle',
        'Placez cette lettre sous enveloppe cachetée',
        'Vous l\'ouvrirez lors du second rendez-vous'
      ]
    },
    {
      id: 'changer-main',
      title: 'Changer de main',
      category: 'Modification comportementale',
      duration: '1 jour',
      description: 'Tenez votre cigarette avec la main opposée à votre habitude pour briser l\'automatisme.',
      icon: '🤚',
      steps: [
        'Identifiez votre main habituelle',
        'Pendant toute une journée, utilisez l\'autre',
        'Observez la sensation d\'étrangeté',
        'Notez comment cela ralentit le geste',
        'Cette difficulté est une prise de conscience',
        'Votre cerveau réapprend qu\'il peut créer de nouvelles habitudes'
      ]
    },
    {
      id: 'lieu-sur',
      title: 'Le lieu sûr',
      category: 'Autohypnose',
      duration: '15 min',
      description: 'Créez un refuge mental dissocié du comportement tabagique, un lieu de ressource et de bien-être.',
      icon: '🏖️',
      steps: [
        'Fermez les yeux et respirez calmement',
        'Imaginez un lieu où vous vous sentez bien',
        'Une plage de l\'Atlantique, une forêt, un jardin...',
        'Visualisez chaque détail : couleurs, sons, odeurs',
        'Dans ce lieu, vous êtes naturellement non-fumeur',
        'Vous ne fumez jamais ici',
        'Ancrez cette sensation de liberté',
        'Vous pouvez revenir ici à tout moment'
      ]
    },
    {
      id: 'rencontre',
      title: 'La rencontre avec l\'adolescent',
      category: 'Visualisation thérapeutique',
      duration: '20 min',
      description: 'Dialogue avec l\'adolescent que vous étiez au moment où vous avez commencé à fumer.',
      icon: '👤',
      steps: [
        'Fermez les yeux et respirez profondément',
        'Visualisez l\'adolescent que vous étiez',
        'Celui qui a commencé à fumer',
        'Accueillez-le avec indulgence, sans jugement',
        'Il avait ses raisons : curiosité, appartenance, rébellion',
        'Il est tombé dans un piège des fabricants de cigarettes',
        'Dites-lui : vous allez retirer ce costume',
        'Retrouvez la personne naturellement non-fumeuse',
        'Expliquez pourquoi c\'est important maintenant'
      ]
    },
    {
      id: 'ressources',
      title: 'Le chemin des ressources',
      category: 'Visualisation guidée',
      duration: '15 min',
      description: 'Un parcours symbolique où vous récoltez vos forces intérieures pour le changement.',
      icon: '🗺️',
      steps: [
        'Visualisez un chemin devant vous',
        'À chaque étape, une ressource apparaît',
        'Quand vous dormez : objet de votre enfance non-fumeur',
        'Quand vous êtes occupé : symbole de concentration',
        'Dans les lieux interdits : rappel de liberté',
        'À chaque moment de tentation : une victoire passée',
        'Récoltez ces objets symboliques',
        'Ils consolident votre confiance'
      ]
    },
    {
      id: 'carrefour',
      title: 'Le carrefour des possibles',
      category: 'Projection future',
      duration: '15 min',
      description: 'Visualisez deux chemins : celui du fumeur et celui du non-fumeur, pour clarifier votre choix.',
      icon: '🛤️',
      steps: [
        'Imaginez-vous à un carrefour',
        'Le chemin de gauche : continuer à fumer',
        'Visualisez où il mène : santé, argent gaspillé, limitations',
        'Le chemin de droite : devenir non-fumeur',
        'Visualisez où il mène : santé, liberté, fierté, économies',
        'Remarquez que le brouillard se lève sur ce chemin',
        'Il est plus agréable, lumineux',
        'Vous vous tournez naturellement vers la droite',
        'C\'est le chemin du non-fumeur'
      ]
    },
    {
      id: 'futurisation',
      title: 'Futurisation positive',
      category: 'Projection temporelle',
      duration: '20 min',
      description: 'Voyagez dans votre futur de non-fumeur à court, moyen et long terme.',
      icon: '🔮',
      steps: [
        'Fermez les yeux et respirez profondément',
        'Dans quelques heures : sentez les parfums, les saveurs',
        'Dans quelques jours : regain d\'énergie évident',
        'Dans quelques semaines : nouvelle évidence',
        'Dans quelques mois : économies, projets réalisés',
        'Dans quelques années : défi important relevé',
        'Votre santé, réussite et fierté',
        'Cette visualisation se conjugue au présent',
        'Elle devient votre réalité'
      ]
    }
  ];

  const seanceGuidee = {
    titre: 'Séance d\'hypnose guidée - Libération du tabac',
    duree: '30 minutes',
    etapes: [
      {
        titre: 'Installation et induction',
        duree: '5 min',
        texte: 'Installez-vous confortablement... Fermez les yeux... Portez attention à votre respiration... À chaque expiration, vous vous détendez un peu plus...'
      },
      {
        titre: 'Retour à vos ressources',
        duree: '5 min',
        texte: 'Vous allez redevenir non-fumeur, c\'est-à-dire retrouver votre capacité naturelle à être non-fumeur... Par une visualisation racontant votre propre histoire...'
      },
      {
        titre: 'Le chemin de gauche (fumeur)',
        duree: '5 min',
        texte: 'Vous voyez se penser, se sentir, se vivre non-fumeur... Au cours de ce cheminement, vous vous connectez à vos ressources...'
      },
      {
        titre: 'Le chemin de droite (non-fumeur)',
        duree: '5 min',
        texte: 'Mais vous savez vers quoi il mène... Vous vous prendrez comme vous l\'êtes... Quand vous vous voyez allongé... ce n\'est pas ce que vous fumez...'
      },
      {
        titre: 'Suggestions post-hypnotiques',
        duree: '5 min',
        texte: 'Vous êtes désormais non-fumeur, et en commençant à bouger, vous pouvez prendre une grande respiration... profonde, comme si c\'était la première de votre nouvelle existence...'
      },
      {
        titre: 'Sortie de transe',
        duree: '5 min',
        texte: 'À votre rythme, vous pouvez rouvrir les yeux... Prenez le temps de revenir doucement... Vous êtes non-fumeur maintenant...'
      }
    ]
  };

  const HomePage = () => (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fond animé avec gradient et motifs respiratoires */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900">
        <div className={`absolute inset-0 transition-opacity duration-4000 ${breathingActive ? 'opacity-30' : 'opacity-10'}`}
             style={{
               backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(20, 184, 166, 0.3) 0%, transparent 50%)',
             }}>
        </div>
        {/* Motifs organiques */}
        <div className="absolute inset-0 opacity-5"
             style={{
               backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0c16.569 0 30 13.431 30 30 0 16.569-13.431 30-30 30C13.431 60 0 46.569 0 30 0 13.431 13.431 0 30 0zm0 10C18.954 10 10 18.954 10 30s8.954 20 20 20 20-8.954 20-20S41.046 10 30 10z\' fill=\'%23ffffff\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
             }}>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* En-tête avec animation d'apparition */}
        <div className="text-center mb-16 animate-[fadeIn_1s_ease-in]">
          <div className="inline-block mb-6">
            <div className={`text-8xl transition-transform duration-4000 ${breathingActive ? 'scale-110' : 'scale-100'}`}>
              🌬️
            </div>
          </div>
          <h1 className="text-7xl font-bold mb-6 text-white tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}>
            Pass ANTI TABAC
          </h1>
          <p className="text-2xl text-blue-200 mb-4"
             style={{ fontFamily: "'Lora', serif" }}>
            Votre parcours d'hypnose thérapeutique
          </p>
          <p className="text-lg text-teal-300 max-w-2xl mx-auto"
             style={{ fontFamily: "'Source Serif Pro', serif" }}>
            Libérez-vous du tabagisme grâce à des techniques d'hypnose personnalisées,
            inspirées des meilleures pratiques cliniques
          </p>
        </div>

        {/* Cartes de navigation principales */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          <div 
            onClick={() => setCurrentView('questionnaire')}
            className="group cursor-pointer">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 
                          hover:bg-white/15 hover:border-teal-400/50 hover:shadow-2xl hover:shadow-teal-500/20
                          transition-all duration-500 hover:-translate-y-2">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-500">
                🎯
              </div>
              <h2 className="text-3xl font-bold text-white mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                Parcours Guidé
              </h2>
              <p className="text-blue-200 text-lg leading-relaxed"
                 style={{ fontFamily: "'Lora', serif" }}>
                Commencez par un questionnaire personnalisé, suivez un programme
                d'hypnose sur mesure et suivez vos progrès au quotidien
              </p>
              <div className="mt-6 flex items-center text-teal-300 font-semibold">
                <span>Commencer le parcours</span>
                <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
              </div>
            </div>
          </div>

          <div 
            onClick={() => setCurrentView('exercises')}
            className="group cursor-pointer">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 
                          hover:bg-white/15 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20
                          transition-all duration-500 hover:-translate-y-2">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-500">
                🧘
              </div>
              <h2 className="text-3xl font-bold text-white mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                Accès Libre
              </h2>
              <p className="text-blue-200 text-lg leading-relaxed"
                 style={{ fontFamily: "'Lora', serif" }}>
                Explorez librement tous les exercices d'autohypnose et séances guidées
                disponibles à tout moment
              </p>
              <div className="mt-6 flex items-center text-blue-300 font-semibold">
                <span>Explorer les exercices</span>
                <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section informative */}
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10">
          <h3 className="text-3xl font-bold text-white mb-6 text-center"
              style={{ fontFamily: "'Playfair Display', serif" }}>
            L'hypnose pour l'arrêt du tabac
          </h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="animate-[fadeIn_1s_ease-in_0.2s_backwards]">
              <div className="text-5xl mb-4">✨</div>
              <h4 className="text-xl font-bold text-teal-300 mb-3">Efficace</h4>
              <p className="text-blue-200" style={{ fontFamily: "'Lora', serif" }}>
                Techniques éprouvées en tabacologie clinique
              </p>
            </div>
            <div className="animate-[fadeIn_1s_ease-in_0.4s_backwards]">
              <div className="text-5xl mb-4">🎨</div>
              <h4 className="text-xl font-bold text-teal-300 mb-3">Personnalisé</h4>
              <p className="text-blue-200" style={{ fontFamily: "'Lora', serif" }}>
                Adapté à votre histoire et vos motivations
              </p>
            </div>
            <div className="animate-[fadeIn_1s_ease-in_0.6s_backwards]">
              <div className="text-5xl mb-4">🌱</div>
              <h4 className="text-xl font-bold text-teal-300 mb-3">Bienveillant</h4>
              <p className="text-blue-200" style={{ fontFamily: "'Lora', serif" }}>
                Sans jugement, à votre rythme
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Lora:ital,wght@0,400;0,600;1,400&family=Source+Serif+Pro:wght@400;600&display=swap');
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );

  const QuestionnairePage = () => {
    const totalSteps = 5;
    
    const motivationOptions = [
      { value: 'sante', label: 'Ma santé', icon: '❤️' },
      { value: 'argent', label: 'Économiser de l\'argent', icon: '💰' },
      { value: 'famille', label: 'Ma famille / mes proches', icon: '👨‍👩‍👧' },
      { value: 'liberte', label: 'Retrouver ma liberté', icon: '🦋' },
      { value: 'image', label: 'Mon image / mon bien-être', icon: '✨' },
      { value: 'performance', label: 'Améliorer mes performances', icon: '💪' },
    ];

    const obstaclesOptions = [
      { value: 'stress', label: 'La gestion du stress', icon: '😰' },
      { value: 'habitude', label: 'L\'habitude / l\'automatisme', icon: '🔄' },
      { value: 'peur_poids', label: 'La peur de prendre du poids', icon: '⚖️' },
      { value: 'social', label: 'Les moments sociaux', icon: '🍷' },
      { value: 'manque', label: 'La peur du manque', icon: '😣' },
      { value: 'cafe', label: 'Le café et autres rituels', icon: '☕' },
    ];

    const environmentOptions = [
      { value: 'maison', label: 'À la maison', icon: '🏠' },
      { value: 'travail', label: 'Au travail', icon: '💼' },
      { value: 'voiture', label: 'En voiture', icon: '🚗' },
      { value: 'soiree', label: 'En soirée', icon: '🌙' },
      { value: 'pause', label: 'Pendant les pauses', icon: '☕' },
      { value: 'stress', label: 'En situation de stress', icon: '😤' },
    ];

    const handleNext = () => {
      if (questionnaireStep < totalSteps) {
        setQuestionnaireStep(questionnaireStep + 1);
      } else {
        // Dernière étape : envoyer l'email
        sendQuestionnaireByEmail();
      }
    };

    const handleBack = () => {
      if (questionnaireStep > 1) {
        setQuestionnaireStep(questionnaireStep - 1);
      } else {
        setCurrentView('home');
      }
    };

    const toggleSelection = (array, setArray, value) => {
      if (array.includes(value)) {
        setArray(array.filter(item => item !== value));
      } else {
        setArray([...array, value]);
      }
    };

    const canProceed = () => {
      switch(questionnaireStep) {
        case 1:
          return userName && userAge && cigarettesPerDay && yearsSmoked && startedAge;
        case 2:
          return motivationDetails.length > 0;
        case 3:
          return obstacles.length > 0;
        case 4:
          return firstCigaretteContext && smokeEnvironment.length > 0;
        case 5:
          return futurVision;
        default:
          return false;
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <button 
            onClick={handleBack}
            className="mb-8 text-teal-300 hover:text-teal-200 flex items-center gap-2 transition-colors">
            <span>←</span> {questionnaireStep === 1 ? 'Retour' : 'Étape précédente'}
          </button>

          {/* Barre de progression */}
          <div className="mb-10">
            <div className="flex justify-between mb-3">
              {[...Array(totalSteps)].map((_, index) => (
                <div key={index} className="flex-1 text-center">
                  <div className={`w-3 h-3 mx-auto rounded-full transition-all ${
                    index + 1 <= questionnaireStep ? 'bg-teal-400' : 'bg-white/20'
                  }`}></div>
                </div>
              ))}
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-teal-400 to-blue-400 transition-all duration-500"
                style={{ width: `${(questionnaireStep / totalSteps) * 100}%` }}>
              </div>
            </div>
            <p className="text-center text-blue-300 text-sm mt-3">
              Étape {questionnaireStep} sur {totalSteps}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20">
            {/* Étape 1 : Informations de base */}
            {questionnaireStep === 1 && (
              <div className="space-y-8 animate-[fadeIn_0.5s_ease-in]">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">👋</div>
                  <h2 className="text-4xl font-bold text-white mb-3"
                      style={{ fontFamily: "'Playfair Display', serif" }}>
                    Faisons connaissance
                  </h2>
                  <p className="text-blue-200" style={{ fontFamily: "'Lora', serif" }}>
                    Pour personnaliser votre parcours, j'ai besoin d'en savoir un peu plus sur vous
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="block text-white font-semibold text-lg">
                    Quel est votre prénom ?
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Votre prénom..."
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition-all"
                    style={{ fontFamily: "'Lora', serif" }}
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-white font-semibold text-lg">
                    Quel âge avez-vous ?
                  </label>
                  <input
                    type="number"
                    value={userAge}
                    onChange={(e) => setUserAge(e.target.value)}
                    placeholder="Votre âge..."
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition-all"
                    style={{ fontFamily: "'Lora', serif" }}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="block text-white font-semibold text-lg">
                      Cigarettes par jour ?
                    </label>
                    <input
                      type="number"
                      value={cigarettesPerDay}
                      onChange={(e) => setCigarettesPerDay(e.target.value)}
                      placeholder="Environ..."
                      className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition-all"
                      style={{ fontFamily: "'Lora', serif" }}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-white font-semibold text-lg">
                      Depuis combien d'années ?
                    </label>
                    <input
                      type="number"
                      value={yearsSmoked}
                      onChange={(e) => setYearsSmoked(e.target.value)}
                      placeholder="Années..."
                      className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition-all"
                      style={{ fontFamily: "'Lora', serif" }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-white font-semibold text-lg">
                    À quel âge avez-vous commencé à fumer ?
                  </label>
                  <input
                    type="number"
                    value={startedAge}
                    onChange={(e) => setStartedAge(e.target.value)}
                    placeholder="Âge..."
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition-all"
                    style={{ fontFamily: "'Lora', serif" }}
                  />
                </div>
              </div>
            )}

            {/* Étape 2 : Motivations */}
            {questionnaireStep === 2 && (
              <div className="space-y-8 animate-[fadeIn_0.5s_ease-in]">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🎯</div>
                  <h2 className="text-4xl font-bold text-white mb-3"
                      style={{ fontFamily: "'Playfair Display', serif" }}>
                    Vos motivations
                  </h2>
                  <p className="text-blue-200" style={{ fontFamily: "'Lora', serif" }}>
                    Quelles sont les raisons qui vous poussent à arrêter de fumer ?<br/>
                    (Sélectionnez toutes celles qui vous correspondent)
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {motivationOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => toggleSelection(motivationDetails, setMotivationDetails, option.value)}
                      className={`p-6 rounded-xl border-2 text-left transition-all ${
                        motivationDetails.includes(option.value)
                          ? 'bg-teal-500/30 border-teal-400 shadow-lg'
                          : 'bg-white/5 border-white/20 hover:bg-white/10'
                      }`}>
                      <div className="text-4xl mb-3">{option.icon}</div>
                      <div className="text-white font-semibold text-lg">
                        {option.label}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="space-y-3 pt-6">
                  <label className="block text-white font-semibold text-lg">
                    Décrivez votre motivation principale en quelques mots
                  </label>
                  <textarea
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                    placeholder="Exemple : Je veux voir mes petits-enfants grandir en bonne santé..."
                    rows={4}
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition-all resize-none"
                    style={{ fontFamily: "'Lora', serif" }}
                  />
                </div>
              </div>
            )}

            {/* Étape 3 : Obstacles */}
            {questionnaireStep === 3 && (
              <div className="space-y-8 animate-[fadeIn_0.5s_ease-in]">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🚧</div>
                  <h2 className="text-4xl font-bold text-white mb-3"
                      style={{ fontFamily: "'Playfair Display', serif" }}>
                    Vos obstacles
                  </h2>
                  <p className="text-blue-200" style={{ fontFamily: "'Lora', serif" }}>
                    Qu'est-ce qui rend l'arrêt difficile pour vous ?<br/>
                    (Identifions ensemble vos freins pour mieux les dépasser)
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {obstaclesOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => toggleSelection(obstacles, setObstacles, option.value)}
                      className={`p-6 rounded-xl border-2 text-left transition-all ${
                        obstacles.includes(option.value)
                          ? 'bg-blue-500/30 border-blue-400 shadow-lg'
                          : 'bg-white/5 border-white/20 hover:bg-white/10'
                      }`}>
                      <div className="text-4xl mb-3">{option.icon}</div>
                      <div className="text-white font-semibold text-lg">
                        {option.label}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="space-y-3 pt-6">
                  <label className="block text-white font-semibold text-lg">
                    Y a-t-il d'autres obstacles dont vous aimeriez parler ?
                  </label>
                  <textarea
                    value={obstaclesDetails}
                    onChange={(e) => setObstaclesDetails(e.target.value)}
                    placeholder="Autres difficultés, peurs ou préoccupations..."
                    rows={3}
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition-all resize-none"
                    style={{ fontFamily: "'Lora', serif" }}
                  />
                </div>
              </div>
            )}

            {/* Étape 4 : Histoire tabagique */}
            {questionnaireStep === 4 && (
              <div className="space-y-8 animate-[fadeIn_0.5s_ease-in]">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">📖</div>
                  <h2 className="text-4xl font-bold text-white mb-3"
                      style={{ fontFamily: "'Playfair Display', serif" }}>
                    Votre histoire tabagique
                  </h2>
                  <p className="text-blue-200" style={{ fontFamily: "'Lora', serif" }}>
                    Comprendre votre relation avec la cigarette pour mieux vous accompagner
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="block text-white font-semibold text-lg">
                    Comment avez-vous commencé à fumer ? Dans quel contexte ?
                  </label>
                  <textarea
                    value={firstCigaretteContext}
                    onChange={(e) => setFirstCigaretteContext(e.target.value)}
                    placeholder="Exemple : J'ai commencé au collège avec mes amis, pour m'intégrer au groupe..."
                    rows={4}
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition-all resize-none"
                    style={{ fontFamily: "'Lora', serif" }}
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-white font-semibold text-lg">
                    Dans quelles situations fumez-vous le plus ?
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {environmentOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => toggleSelection(smokeEnvironment, setSmokeEnvironment, option.value)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          smokeEnvironment.includes(option.value)
                            ? 'bg-purple-500/30 border-purple-400 shadow-lg'
                            : 'bg-white/5 border-white/20 hover:bg-white/10'
                        }`}>
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{option.icon}</div>
                          <div className="text-white font-semibold">
                            {option.label}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-white font-semibold text-lg">
                    Avez-vous déjà essayé d'arrêter ? Si oui, qu'est-ce qui s'est passé ?
                  </label>
                  <textarea
                    value={previousAttempts}
                    onChange={(e) => setPreviousAttempts(e.target.value)}
                    placeholder="Exemple : J'ai arrêté 2 mois avec des patchs, mais j'ai recraché lors d'une soirée stressante..."
                    rows={4}
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition-all resize-none"
                    style={{ fontFamily: "'Lora', serif" }}
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-white font-semibold text-lg">
                    Avez-vous des préoccupations de santé liées au tabac ?
                  </label>
                  <textarea
                    value={healthConcerns}
                    onChange={(e) => setHealthConcerns(e.target.value)}
                    placeholder="Exemple : Essoufflement, toux chronique, antécédents familiaux..."
                    rows={3}
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition-all resize-none"
                    style={{ fontFamily: "'Lora', serif" }}
                  />
                </div>
              </div>
            )}

            {/* Étape 5 : Vision du futur */}
            {questionnaireStep === 5 && (
              <div className="space-y-8 animate-[fadeIn_0.5s_ease-in]">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🔮</div>
                  <h2 className="text-4xl font-bold text-white mb-3"
                      style={{ fontFamily: "'Playfair Display', serif" }}>
                    Votre futur de non-fumeur
                  </h2>
                  <p className="text-blue-200" style={{ fontFamily: "'Lora', serif" }}>
                    Projetons-nous ensemble dans votre vie sans cigarette
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="block text-white font-semibold text-lg">
                    Comment imaginez-vous votre vie de non-fumeur ?
                  </label>
                  <p className="text-blue-300 text-sm mb-3" style={{ fontFamily: "'Lora', serif" }}>
                    Décrivez ce qui sera différent : votre santé, votre énergie, vos projets, votre quotidien...
                  </p>
                  <textarea
                    value={futurVision}
                    onChange={(e) => setFuturVision(e.target.value)}
                    placeholder="Exemple : Je me vois faire du vélo avec mes enfants sans être essoufflé, économiser pour un voyage en famille, sentir à nouveau les parfums..."
                    rows={6}
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition-all resize-none"
                    style={{ fontFamily: "'Lora', serif" }}
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-white font-semibold text-lg">
                    Seriez-vous intéressé(e) par une substitution nicotinique ? (Patchs, gommes...)
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {['Oui, absolument', 'Peut-être', 'Non, je préfère sans'].map(option => (
                      <button
                        key={option}
                        onClick={() => setSubstitutionInterest(option)}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${
                          substitutionInterest === option
                            ? 'bg-teal-500/30 border-teal-400 shadow-lg'
                            : 'bg-white/5 border-white/20 hover:bg-white/10'
                        }`}>
                        <div className="text-white font-semibold text-sm">
                          {option}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-teal-500/10 border border-teal-400/30 rounded-xl p-6 mt-8">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">✨</div>
                    <div>
                      <h3 className="text-white font-bold text-xl mb-2"
                          style={{ fontFamily: "'Playfair Display', serif" }}>
                        Vous êtes prêt(e) !
                      </h3>
                      <p className="text-teal-200" style={{ fontFamily: "'Lora', serif" }}>
                        Grâce à vos réponses, nous allons personnaliser votre programme d'hypnose 
                        et vous accompagner vers votre libération du tabac.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Boutons de navigation */}
            <div className="flex gap-4 mt-10 pt-8 border-t border-white/10">
              {questionnaireStep > 1 && (
                <button
                  onClick={handleBack}
                  className="px-8 py-4 bg-white/5 border border-white/20 text-white font-semibold rounded-xl 
                           hover:bg-white/10 transition-all"
                  style={{ fontFamily: "'Lora', serif" }}>
                  ← Précédent
                </button>
              )}
              
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex-1 py-5 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold text-xl rounded-xl 
                         hover:from-teal-400 hover:to-blue-400 hover:shadow-2xl hover:shadow-teal-500/50
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none
                         transition-all duration-300 transform hover:-translate-y-1"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                {questionnaireStep === totalSteps ? 'Envoyer et commencer 🚀' : 'Suivant →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DashboardPage = () => {
    const cigaretteCost = 11; // Prix moyen d'un paquet de 20
    const costPerCigarette = cigaretteCost / 20;
    const dailySavings = (cigarettesPerDay || 0) * costPerCigarette;
    const totalSaved = progressData.daysWithout * dailySavings;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <button 
            onClick={() => setCurrentView('home')}
            className="mb-8 text-teal-300 hover:text-teal-200 flex items-center gap-2 transition-colors">
            <span>←</span> Retour
          </button>

          {/* En-tête personnalisée */}
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}>
              Bonjour {userName || 'Voyageur'} 👋
            </h2>
            <p className="text-2xl text-blue-200" style={{ fontFamily: "'Lora', serif" }}>
              Votre parcours de libération
            </p>
          </div>

          {/* Statistiques de progression */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-teal-500/20 to-teal-600/20 backdrop-blur-md rounded-2xl p-8 border border-teal-400/30">
              <div className="text-5xl mb-4">📅</div>
              <div className="text-4xl font-bold text-white mb-2">{progressData.daysWithout}</div>
              <div className="text-teal-200" style={{ fontFamily: "'Lora', serif" }}>
                Jours sans cigarette
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-md rounded-2xl p-8 border border-blue-400/30">
              <div className="text-5xl mb-4">🚭</div>
              <div className="text-4xl font-bold text-white mb-2">{progressData.cigarettesAvoided}</div>
              <div className="text-blue-200" style={{ fontFamily: "'Lora', serif" }}>
                Cigarettes évitées
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-md rounded-2xl p-8 border border-green-400/30">
              <div className="text-5xl mb-4">💰</div>
              <div className="text-4xl font-bold text-white mb-2">{totalSaved.toFixed(0)}€</div>
              <div className="text-green-200" style={{ fontFamily: "'Lora', serif" }}>
                Économisés
              </div>
            </div>
          </div>

          {/* Accès rapide */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div 
              onClick={() => setCurrentView('seance-guidee')}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 cursor-pointer hover:bg-white/15 hover:border-teal-400/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-6">
                <div className="text-6xl">🎧</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3"
                      style={{ fontFamily: "'Playfair Display', serif" }}>
                    Séance d'hypnose guidée
                  </h3>
                  <p className="text-blue-200 mb-4" style={{ fontFamily: "'Lora', serif" }}>
                    Séance complète de 30 minutes pour ancrer votre transformation
                  </p>
                  <div className="flex items-center text-teal-300 font-semibold">
                    <span>Commencer la séance</span>
                    <span className="ml-2">→</span>
                  </div>
                </div>
              </div>
            </div>

            <div 
              onClick={() => setCurrentView('exercises')}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 cursor-pointer hover:bg-white/15 hover:border-blue-400/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-6">
                <div className="text-6xl">📚</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3"
                      style={{ fontFamily: "'Playfair Display', serif" }}>
                    Exercices d'autohypnose
                  </h3>
                  <p className="text-blue-200 mb-4" style={{ fontFamily: "'Lora', serif" }}>
                    {exercises.length} techniques à pratiquer au quotidien
                  </p>
                  <div className="flex items-center text-blue-300 font-semibold">
                    <span>Explorer les exercices</span>
                    <span className="ml-2">→</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progression des exercices */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}>
              Votre progression
            </h3>
            
            {progressData.exercisesCompleted.length === 0 ? (
              <p className="text-blue-200 text-center py-8" style={{ fontFamily: "'Lora', serif" }}>
                Commencez votre premier exercice pour suivre votre progression
              </p>
            ) : (
              <div className="space-y-4">
                {progressData.exercisesCompleted.map((ex, index) => (
                  <div key={index} className="flex items-center gap-4 bg-white/5 rounded-xl p-4">
                    <div className="text-3xl">{ex.icon}</div>
                    <div className="flex-1">
                      <div className="text-white font-semibold">{ex.title}</div>
                      <div className="text-blue-300 text-sm">{ex.completedDate}</div>
                    </div>
                    <div className="text-2xl">✅</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ExercisesPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => setCurrentView(userName ? 'dashboard' : 'home')}
          className="mb-8 text-teal-300 hover:text-teal-200 flex items-center gap-2 transition-colors">
          <span>←</span> Retour
        </button>

        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}>
            Exercices d'autohypnose
          </h2>
          <p className="text-xl text-blue-200" style={{ fontFamily: "'Lora', serif" }}>
            {exercises.length} techniques personnalisées pour votre libération
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise, index) => (
            <div
              key={exercise.id}
              onClick={() => setCurrentExercise(exercise)}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 cursor-pointer 
                       hover:bg-white/15 hover:border-teal-400/50 hover:shadow-xl transition-all duration-300 
                       hover:-translate-y-2"
              style={{
                animation: `fadeIn 0.6s ease-in ${index * 0.1}s backwards`
              }}>
              <div className="text-5xl mb-4">{exercise.icon}</div>
              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-teal-500/30 text-teal-200 text-xs rounded-full border border-teal-400/30">
                  {exercise.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                {exercise.title}
              </h3>
              <p className="text-blue-200 text-sm mb-4 leading-relaxed"
                 style={{ fontFamily: "'Lora', serif" }}>
                {exercise.description}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-teal-300">⏱️ {exercise.duration}</span>
                <span className="text-blue-300 font-semibold">Pratiquer →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {currentExercise && (
        <ExerciseModal exercise={currentExercise} onClose={() => setCurrentExercise(null)} />
      )}
    </div>
  );

  const ExerciseModal = ({ exercise, onClose }) => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-[fadeIn_0.3s_ease-in]"
         onClick={onClose}>
      <div className="bg-gradient-to-br from-slate-800 to-blue-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl"
           onClick={(e) => e.stopPropagation()}>
        <div className="p-10">
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="text-7xl mb-4">{exercise.icon}</div>
              <h3 className="text-4xl font-bold text-white mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                {exercise.title}
              </h3>
              <div className="flex gap-3">
                <span className="inline-block px-4 py-2 bg-teal-500/30 text-teal-200 text-sm rounded-full border border-teal-400/30">
                  {exercise.category}
                </span>
                <span className="inline-block px-4 py-2 bg-blue-500/30 text-blue-200 text-sm rounded-full border border-blue-400/30">
                  ⏱️ {exercise.duration}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white text-4xl leading-none transition-colors">
              ×
            </button>
          </div>

          <p className="text-xl text-blue-200 mb-8 leading-relaxed"
             style={{ fontFamily: "'Lora', serif" }}>
            {exercise.description}
          </p>

          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h4 className="text-2xl font-bold text-white mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}>
              Étapes de pratique
            </h4>
            <div className="space-y-4">
              {exercise.steps.map((step, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-500/30 rounded-full flex items-center justify-center border border-teal-400/50 text-teal-300 font-bold">
                    {index + 1}
                  </div>
                  <p className="text-blue-100 leading-relaxed pt-1"
                     style={{ fontFamily: "'Lora', serif" }}>
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              // Marquer comme complété
              const newExercise = {
                ...exercise,
                completedDate: new Date().toLocaleDateString('fr-FR')
              };
              setProgressData(prev => ({
                ...prev,
                exercisesCompleted: [...prev.exercisesCompleted, newExercise]
              }));
              onClose();
            }}
            className="w-full mt-8 py-5 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold text-xl rounded-xl 
                     hover:from-teal-400 hover:to-blue-400 hover:shadow-2xl hover:shadow-teal-500/50
                     transition-all duration-300"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Marquer comme complété ✓
          </button>
        </div>
      </div>
    </div>
  );

  const SeanceGuideePage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className="mb-8 text-purple-300 hover:text-purple-200 flex items-center gap-2 transition-colors">
            <span>←</span> Retour
          </button>

          <div className="text-center mb-12">
            <div className="text-7xl mb-6">🎧</div>
            <h2 className="text-5xl font-bold text-white mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}>
              {seanceGuidee.titre}
            </h2>
            <p className="text-xl text-purple-200" style={{ fontFamily: "'Lora', serif" }}>
              Durée totale : {seanceGuidee.duree}
            </p>
          </div>

          {/* Barre de progression */}
          <div className="mb-12">
            <div className="flex justify-between mb-3">
              {seanceGuidee.etapes.map((etape, index) => (
                <div key={index} className="text-center flex-1">
                  <div className={`w-3 h-3 mx-auto rounded-full mb-2 transition-all ${
                    index <= currentStep ? 'bg-teal-400' : 'bg-white/20'
                  }`}></div>
                  <div className={`text-xs ${index <= currentStep ? 'text-teal-300' : 'text-white/40'}`}>
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-teal-400 to-blue-400 transition-all duration-500"
                style={{ width: `${((currentStep + 1) / seanceGuidee.etapes.length) * 100}%` }}>
              </div>
            </div>
          </div>

          {/* Étape actuelle */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 mb-8">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-purple-500/30 text-purple-200 text-sm rounded-full border border-purple-400/30 mb-4">
                Étape {currentStep + 1} / {seanceGuidee.etapes.length}
              </span>
              <h3 className="text-3xl font-bold text-white mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                {seanceGuidee.etapes[currentStep].titre}
              </h3>
              <p className="text-purple-300">
                Durée : {seanceGuidee.etapes[currentStep].duree}
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-8 border border-white/10 mb-8">
              <p className="text-blue-100 text-lg leading-relaxed"
                 style={{ fontFamily: "'Lora', serif" }}>
                {seanceGuidee.etapes[currentStep].texte}
              </p>
            </div>

            {/* Contrôles audio simulés */}
            <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl p-6 border border-purple-400/30">
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                  ⏮
                </button>
                
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center text-white text-3xl hover:shadow-2xl hover:shadow-teal-500/50 transition-all hover:scale-110">
                  {isPlaying ? '⏸' : '▶'}
                </button>
                
                <button
                  onClick={() => setCurrentStep(Math.min(seanceGuidee.etapes.length - 1, currentStep + 1))}
                  disabled={currentStep === seanceGuidee.etapes.length - 1}
                  className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                  ⏭
                </button>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-4">
            {currentStep < seanceGuidee.etapes.length - 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex-1 py-5 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold text-xl rounded-xl 
                         hover:from-teal-400 hover:to-blue-400 hover:shadow-2xl hover:shadow-teal-500/50
                         transition-all duration-300"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Étape suivante →
              </button>
            ) : (
              <button
                onClick={() => {
                  setProgressData(prev => ({
                    ...prev,
                    exercisesCompleted: [...prev.exercisesCompleted, {
                      icon: '🎧',
                      title: 'Séance d\'hypnose guidée complète',
                      completedDate: new Date().toLocaleDateString('fr-FR')
                    }]
                  }));
                  setCurrentView('dashboard');
                }}
                className="flex-1 py-5 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold text-xl rounded-xl 
                         hover:from-green-400 hover:to-teal-400 hover:shadow-2xl hover:shadow-green-500/50
                         transition-all duration-300"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Terminer la séance ✓
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Router principal
  return (
    <div className="font-sans antialiased">
      {currentView === 'home' && <HomePage />}
      {currentView === 'questionnaire' && <QuestionnairePage />}
      {currentView === 'dashboard' && <DashboardPage />}
      {currentView === 'exercises' && <ExercisesPage />}
      {currentView === 'seance-guidee' && <SeanceGuideePage />}
    </div>
  );
};

export default PassAntiTabac;
