/**
 * Tree Component.
 * Render data as collapsible tree
 * @module Tree
 */
import React from 'react';
import PropTypes from 'prop-types';
import ChevronLeft from '../../Svg/ChevronLeft';
import './Tree.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /* Tree data. */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.node,
      children: PropTypes.arrayOf(PropTypes.any),
    })
  ).isRequired,
  /* Id of the selected node. */
  selected: PropTypes.string,
  /* On set expanded attribute of node. */
  onToggle: PropTypes.func.isRequired,
  /* On set current attribute of node. */
  onSelect: PropTypes.func,
  /* Array of expanded nodes. */
  expanded: PropTypes.arrayOf(PropTypes.string),
  /* Set tree hidden state. */
  isHidden: PropTypes.bool,
  /* Depth level of the tree. */
  level: PropTypes.number,
  /* Height of the node fo height calculations. */
  nodeHeight: PropTypes.number,
};
/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  level: 0,
  expanded: [],
  selected: '',
  isHidden: false,
  nodeHeight: 35,
  onSelect: () => {}
};
/**
 * Count expanded (visible) nodes for tree height calculation
 * @param data {Array}
 * @param expanded {Array}
 * @returns {number}
 */
const countVisibleNodes = (data, expanded) => {
  let result = 0;
  data.forEach((node) => {
    if (expanded.includes(node.id) && node.children.length > 0) {
      result += countVisibleNodes(node.children, expanded);
    }
    result += 1;
  });
  return result;
};


const Tree = ({ data, expanded, selected, onToggle, onSelect, isHidden, level, nodeHeight }) => {
  const commonProps = {
    expanded, selected, onToggle, onSelect, nodeHeight
  };
  // count max height of the tree for css animation
  let maxHeight = isHidden ? 0 : countVisibleNodes(data, expanded) * nodeHeight;
  // add 1px height (border size) for the root tree for bottom border height compensation
  if (level === 0) {
    maxHeight += 1;
  }
  return (
    <ul className="Tree" style={{ maxHeight: `${maxHeight}px` }}>
      {data.map((node) => {
        const { id, children, label } = node;
        const isExpanded = expanded.includes(id);
        const isSelected = selected === id;
        // if children exists create subtree
        const subTree = children.length > 0
          ? (
            <Tree
              data={children}
              {...commonProps}
              isHidden={isHidden || !isExpanded}
              level={level + 1}
            />
          )
          : null;
        // set main node css styles depending on state
        let nodeClassName = 'Tree__node';
        if (isSelected) {
          nodeClassName += ' Tree__node_isSelected';
        }
        if (isExpanded) {
          nodeClassName += ' Tree__node_isExpanded';
        }
        return (
          <li key={id} className={nodeClassName}>
            <button type="button" className="Tree__label" tabIndex="-1" onClick={() => onSelect(id)}>
              {label}
            </button>
            {!!children.length
            && (
              <button type="button" className="Tree__toggle" onClick={() => onToggle(id, !isExpanded)}>
                <div className="Tree__toggleIcon">
                  <ChevronLeft />
                </div>
              </button>
            )}
            {subTree}
          </li>
        );
      })}
    </ul>
  );
};

Tree.propTypes = propTypes;
Tree.defaultProps = defaultProps;

export default Tree;
