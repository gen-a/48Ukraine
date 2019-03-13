/**
 * Pagination Component.
 * Placeholder fot the description
 * @module Pagination
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { uid } from 'react-uid';
import ChevronLeft from '../../Svg/ChevronLeft';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MuiTheme from '../MaterialUI/MuiTheme';
import colors from '../../../_colors.scss';
import classNames from 'classnames';
import { Route } from 'react-router-dom';

import './Pagination.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Class object of material design MUI. */
  classes: PropTypes.object.isRequired,
  /** Limit of the pages to show. */
  limit: PropTypes.number.isRequired,
  /** Total number of pages. */
  total: PropTypes.number.isRequired,
  /** Current pages. */
  current: PropTypes.number.isRequired,
  /** Route history object. */
  history: PropTypes.object.isRequired,
  /** URL template as /something/:page. */
  url: PropTypes.string.isRequired,
};

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: colors.colorNeutral3H,
    },
    cursor: 'pointer',
  },
  normal: {
    backgroundColor: colors.colorPrimary3H,
    '&:hover': {
      backgroundColor: colors.colorPrimary2H,
    },
    cursor: 'pointer',
  },
  current: {
    backgroundColor: colors.colorSecondaryHB,
    '&:hover': {
      backgroundColor: colors.colorSecondaryHB,
    },
    color: 'white',
    cursor: 'default',
  }
});

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
const Pagination = ({ classes, limit, total, current, history, url }) => {

  const length = Math.min(total, limit);
  const getOffset = c => Math.min(total - length + 1, Math.max(1, c - Math.floor(length / 2)));


  const [offset, setOffset] = useState(getOffset(current));
  const redirectTo = (page) => {
    history.push(url.replace(/:page/, page));
  };

  return (

    <div className="Pagination">
      <Button
        className={classes.button}
        onClick={() => setOffset(Math.max(1, offset - length))}
      >
        <ChevronLeft width="24px" height="24px"/>
      </Button>

      {
        [...new Array(length)].map((n, index) => {
          return (
            <MuiTheme key={uid(index + offset)}>
              {index + offset === current
                ? (
                  <Button
                    disableRipple
                    className={classNames(classes.button, classes.current)}
                  >
                    {index + offset}
                  </Button>
                )
                : (
                  <Button
                    onClick={() => redirectTo(index + offset)}
                    className={classNames(classes.button, classes.normal)}
                  >
                    {index + offset}
                  </Button>
                )
              }
            </MuiTheme>
          );
        })
      }
      <Button
        className={classes.button}
        onClick={() => setOffset(Math.min(total - length + 1, offset + length))}
      >
        <ChevronLeft width="24px" height="24px" style={{ transform: 'rotate(180deg)' }}/>
      </Button>
    </div>

  );
};

Pagination.propTypes = propTypes;

const C = withStyles(styles)(Pagination);
export default props => <Route render={routeProps => <C {...routeProps} {...props} />} />;
