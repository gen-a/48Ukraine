const articles = {
  authentication: {
    title: 'Аутентифікація'
  },
  label: {
    email: 'Електронна адреса',
    password: 'пароль',
    next: 'Далі',
    login: 'Увійти',
    showHidePassword: 'Показати/сховати пароль',
    rememberMe: 'Запам`ятати мене'
  },
  error: {
    invalidPassword: 'Невірний пароль',
    invalidEmail: 'Невірниа електронна адреса',
    missingRequiredParameters: 'Відсутні обов`язкові дані: :parameters'
  },
  auth: {
    error: {
      incorrectUserName: 'Невірниа електронна адреса',
      incorrectPassword: 'Невірний пароль',
      missingCredentials: 'Відсутні повноваження',
      noUserFound: 'Користувача не знайдено',
      noValidEntryFound: 'Відсутній обліковий запис для :email',
      noValidEntryFoundByVisa: 'Access link is not valid or outdated',
      failedLogInWithVisa: 'Access link is not valid or outdated',
      invalidEmail: 'Invalid E-mail address '
    },
    info: {
      youHaveBeenLoggedIn: 'Ви увійшли в обліковий запис',
      youHaveBeenLoggedOut: 'Ви вийшли з облікового запису',
      accessLetterHasBeenSent: 'Лист з подальшими кроками було відправлено на :email',
      passwordHasBeenSent: 'Лист з паролєм було відправлено на :email',
      pleaseUsePasswordToEnter: 'Будьласка увійдіть з систему з Вашим паролєм'
    }
  },
  user: {
    error: {
      notFound: 'Користувача не знайдено'
    },
    info: {
      passwordHasBeenStored: 'Паоль збережен'
    }
  },
  flashMessage: {
    title: {
      serverMessage: 'Повідомлення серверу',
      error: 'Помилка!'
    }
  },
  loading: {
    message: {
      error: {
        loading: 'Помилка в завантаженні компонента... Спробуйте пізніше',
        timeout: 'Забагато часу на обробку запиту... Спробуйте пізніше',
      }
    }
  },
  order:{
    info:{
      theOrderHasBeenPlaced: 'Ваше замовлення отримано. Номер замовлення :number. Підтверження надіслано на адресу :email'
    }
  }

};

export default articles;
