import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';
import 'react-toastify/dist/ReactToastify.css';

class Searchbar extends Component {
  state = {
    text: '',
  };
  handleChange = event => {
    this.setState({
      text: event.target.value,
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.text.trim() === '') {
      return toast.error('Enter search');
    }
    this.props.onSubmit(this.state.text);
    this.setState({
      text: '',
    });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className= {s.SearchForm__button}>
            <span className= {s.SearchForm_button__label} >Search</span>
          </button>

          <input
            onChange={this.handleChange}
            className={s.SearchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

 export default Searchbar