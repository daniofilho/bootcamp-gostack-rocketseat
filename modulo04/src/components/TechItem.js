import React from "react";
import PropTypes from "prop-types";

//function TechItem(props) {
function TechItem({ tech, onDelete }) {
  return (
    <li>
      - {tech}
      <button type="button" onClick={onDelete}>
        Remover
      </button>
    </li>
  );
}

/**
 * Definindo propriedades padrão
 * e tipos obrigatórios
 */

TechItem.defaultProps = {
  tech: "_"
};

TechItem.propTypes = {
  tech: PropTypes.string,
  onDelete: PropTypes.func.isRequired
};

export default TechItem;
