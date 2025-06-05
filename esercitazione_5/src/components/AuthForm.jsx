import React, { useState } from 'react';

// Componente funzionale per gestire sia login che registrazione
// Riceve 'onSubmitForm' (funzione per gestire l'invio) e 'isLogin' (booleano) come props
function AuthForm({ onSubmitForm, formType}) {
    // TODO useState Hook per gestire lo stato locale dei campi del form

    // TODO richiamare la relativa funzione passata dall'app
    const handleSubmit = (event) => {

    };

    // JSX per il rendering del form
    return (
        <form onSubmit={handleSubmit}>
            <h2>{formType === 'login' ? 'Login' : 'Registrati'}</h2>

            {// TODO Gestire il Rendering condizionale del campo username
                (<div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        // onChange gestisce l'aggiornamento dello stato (Controlled Component)
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
            )}

            <div>
                <label htmlFor={`${formType}-email`}>Email:</label>
                <input
                    type="email"
                    id={`${formType}-email`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor={`${formType}-password`}>Password:</label>
                <input
                    type="password"
                    id={`${formType}-password`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={formType === 'register' ? 6 : undefined}
                />
            </div>
            <button type="submit">{formType === 'login' ? 'Login' : 'Registrati'}</button>
        </form>
    );
}

export default AuthForm;