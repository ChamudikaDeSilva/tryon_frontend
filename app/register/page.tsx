import RegisterForm from "@/components/forms/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/image/clothe-bg.jpg')" }}>
      <RegisterForm />
    </main>
  );
}
