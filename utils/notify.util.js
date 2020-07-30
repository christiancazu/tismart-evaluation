import { Notification } from 'element-ui';

export default {
  success: (message = '') => Notification.success({
    title: 'Correcto',
    message,
    type: 'success'
  }),

  warning: (message = '') => Notification.warning({
    title: 'Atención',
    message,
    type: 'warning'
  }),

  error: (message = 'Algo salió mal') => Notification.error({
    title: 'Error',
    message,
    type: 'error'
  })
};
