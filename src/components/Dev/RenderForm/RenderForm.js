import React from 'react';

const RenderForm = ({isPristine, isSubmitting, messageType, message, children, onSubmit, onReset}) =>{
  return (
    <form onSubmit={onSubmit}>
      {message && <strong>{message}</strong>}

      {children}

      <div>
        <button type="submit" disabled={isPristine}>Submit</button>
        <button type="button" disabled={isPristine || isSubmitting} onClick={onReset}>Clear Values</button>
      </div>
    </form>
  );
};

export default RenderForm;
