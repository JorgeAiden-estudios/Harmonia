## npm run dev

## install node 23.10.0

## RUN from Harmonia (ROOT FOLDER)

cd harmonia

npm i

# Install layout dependencies

npm install tailwind-merge

npm install react-icons

# Install DB dependencies

npm i supabase@">=1.8.1" --save-dev

npm install @supabase/auth-helpers-nextjs
npm install @supabase/auth-helpers-react

npm install stripe

#AUTENTICACION CORAL
npm install @radix-ui/react-dialog

#despues npm run dev

#creamos en hooks useAuthModal.ts y dentro abrimos terminal, le damos a clear e instalamos el siguiente comando

npm install zustand

#despues de nuevo npm run dev

#de nuevo en AuthModal.tsx le damos a clear y vamos a instalar algo nuevo
 npm install @supabase/auth-ui-react

#clear de nuevo e instalamos otro nuevo paquete
npm install @supabase/auth-ui-shared
#despues npm run dev

npm install react-hot-toast

npm install react-hook-form

npm install uniqid

npm install -D @types/uniqid

npm install query-string

# INSTALAR PARA SONIDO 

npm install @radix-ui/react-slider

npm install use-sound

#Stripe 
npm install react-spinners

npm install @stripe/stripe-js

npm install @supabase/supabase-js


https://docs.stripe.com/stripe-cli?install-method=homebrew

stripe login

stripe listen --forward-to localhost:3000/api/webhooks 
#aqui sale un whsec que hay que pegar en .env.local en STRIPE_WEBHOOK_SECRET



