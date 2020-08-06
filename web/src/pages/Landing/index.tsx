import React, { useState, useEffect } from 'react';

// Importando do react-router-dom um componente chamado Link
// Evita que a aplicação seja carregada do zero quando o usuário navega entre as páginas
import { Link } from 'react-router-dom';


// Importar as imagens
import logoImg from "../../assets/images/logo.svg";
import landingImg from "../../assets/images/landing.svg";
// Importar os ícones
import studyIcon from "../../assets/images/icons/study.svg";
import giveClassesIcon from "../../assets/images/icons/give-classes.svg";
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg";

// Importando a API para conexão com o back-end
import api from '../../services/api';

import './styles.css';


function Landing() {
  // Exibir o número de conexões
  const [totalConnections, settTotalConnections] = useState(0);

  useEffect(() => {
    api.get('connections/').then(response => {
      const { total } = response.data;
      settTotalConnections(total);
    })
  }, []);

    return (
        <div id="page-landing">
          <div className="container" id="page-landing-content">
            <div className="logo-container">
              <img src={logoImg} alt="Proffy" />
              <h2>Sua Plataforma de estudos online</h2>
            </div>

            <img
              src={landingImg}
              alt="Plataforma de Estudos"
              className="hero-image"
            />

            <div className="buttons-container">
              <Link to="/study" className="study">
                <img src={studyIcon} alt="Estudar" />
                Estudar
              </Link>

              <Link to="/give-classes" className="give-classes">
                <img src={giveClassesIcon} alt="Dar Aulas" />
                Dar Aulas
              </Link>
            </div>

            <span className="total-connections">
              Total de {totalConnections} conexões já realizadas.
              <img src={purpleHeartIcon} alt="Coração Roxo" />
            </span>
          </div>
        </div>
    );
}

export default Landing;
