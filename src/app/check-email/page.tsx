import { redirect } from 'next/navigation';

export default function CheckEmailRedirect() {
  redirect('/verify-code');
}
