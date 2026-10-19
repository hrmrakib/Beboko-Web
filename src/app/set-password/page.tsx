import { redirect } from 'next/navigation';

export default function SetPasswordRedirect() {
  redirect('/reset-password');
}
