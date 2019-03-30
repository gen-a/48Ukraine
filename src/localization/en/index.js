const articles = {
  authentication: {
    title: 'Authentication'
  },
  label: {
    email: 'E-mail',
    password: 'Password',
    next: 'Next',
    login: 'Login',
    showHidePassword: 'Show/hide password',
    rememberMe: 'Remember me on this device'
  },
  error: {
    invalidPassword: 'Invalid password',
    invalidEmail: 'Invalid e-mail address',
    missingRequiredParameters: 'Missing required parameters: :parameters'
  },
  auth: {
    error: {
      incorrectUserName: 'Incorrect email',
      incorrectPassword: 'Incorrect password',
      missingCredentials: 'Missing credentials',
      noUserFound: 'No user found',
      noValidEntryFound: 'No account found foк :email',
      noValidEntryFoundByVisa: 'Access link is not valid or outdated',
      failedLogInWithVisa: 'Access link is not valid or outdated',
      invalidEmail: 'Invalid E-mail address '
    },
    info: {
      youHaveBeenLoggedIn: 'You have been logged in',
      youHaveBeenLoggedOut: 'You have been logged out',
      accessLetterHasBeenSent: 'Letter with further instructions has been sent to :email',
      passwordHasBeenSent: 'Letter with the password has been set to :email',
      pleaseUsePasswordToEnter: 'Please use the password to login'
    }
  },
  user: {
    error: {
      notFound: 'No user found'
    },
    info: {
      passwordHasBeenStored: 'Password has been stored'
    }
  },
  flashMessage: {
    title: {
      serverMessage: 'Server Message',
      error: 'Error!'
    }
  },
  loading: {
    message: {
      error: {
        loading: 'Error to loading component... Please try again',
        timeout: 'Taking a long time... Please try again',
      }
    }
  },
  order:{
    info:{
      theOrderHasBeenPlaced:'The order has been placed. The number is #:number. Confirmation sent to :email'
    }
  }

};

export default articles;
