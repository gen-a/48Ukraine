/**
 * AddressBook Component.
 * Placeholder fot the description
 * @module AddressBook
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'react-addons-update';
import { CircularProgress } from '../../UI/MaterialUI' ;
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AddressBookIcon from '../../Svg/AddressBook' ;

import { URL_USER_ADDRESS_BOOK } from '../../../config/api';
import { get } from '../../../services/ajax';

import cssStyles from '../../../_styles.scss';
import './AddressBook.scss';

/**
 * PropTypes of the component
 * @type {object}
 */
const propTypes = {
  /** Text message of the toast. */
  classes: PropTypes.shape({}).isRequired,
};

/**
 * Default props of the component
 * @type {object}
 */
const defaultProps = {
  //prop: '',
};


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  },
  formControl: {
    margin: 0,
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
class AddressBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAddress: '',
      addresses: [],
      isBusy: true
    };
  }

  componentDidMount() {
    get(URL_USER_ADDRESS_BOOK, {}, this.onLoadAddresses.bind(this));
  }

  onLoadAddresses({ error, message, data }) {
    const { callAddFlashMessage } = this.props;
    if (error === 0) {
      this.setState(prevState => update(prevState, {
        addresses: { $set: data.records },
        isBusy: { $set: false },
      }));
    } else {
      callAddFlashMessage(message, 'server response', 'error');
    }
  }

  onChange(event) {
    this.setState(prevState => update(prevState, {
      [event.target.name]: { $set: event.target.value },
    }), () => {
      const { onChange } = this.props;
      const { addresses, selectedAddress } = this.state;
      const selected = addresses.filter(a => a.fullAddress === selectedAddress);
      onChange(selected.length === 1 ? selected[0] : {});
    });
  }

  trimLabel(value) {
    return value.length > 30 ? `${value.substr(0, 30)}...` : value;
  }

  render() {
    const { addresses, isBusy, selectedAddress } = this.state;
    const { classes } = this.props;

    if (isBusy && addresses.length === 0) {
      return <CircularProgress/>;
    }
    if (addresses.length === 0) {
      return null;
    }

    const menuItems = addresses.map(a => (
      <MenuItem
        key={a.fullAddress}
        value={a.fullAddress}>
        {this.trimLabel(a.fullAddress)}
      </MenuItem>
    ));

    return (
      <div className="AddressBook">
        <div className="AddressBook__icon">
          <AddressBookIcon width="24" height="24" fill={cssStyles.colorPrimaryH}/>
        </div>
        <div className="AddressBook__select">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="address-selector">Address Book</InputLabel>
            <Select
              value={selectedAddress}
              onChange={e => this.onChange(e)}
              inputProps={{
                name: 'selectedAddress',
                id: 'address-selector',
              }}
            >
              <MenuItem value="">
                <em>Select One</em>
              </MenuItem>
              {menuItems}
            </Select>
          </FormControl>
        </div>
      </div>
    );
  }
}

AddressBook.propTypes = propTypes;
AddressBook.defaultProps = defaultProps;

export default withStyles(styles)(AddressBook);

