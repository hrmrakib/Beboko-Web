import { redirect } from 'next/navigation';

export default function ForgetPasswordRedirect() {
  redirect('/forgot-password');
}
