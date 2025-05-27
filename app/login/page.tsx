import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <main
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/image/clothe-bg.jpg')" }}
    >
      <LoginForm />
    </main>
  );
}
