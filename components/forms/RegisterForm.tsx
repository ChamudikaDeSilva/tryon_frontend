"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
}

export default function RegisterForm() {
  const { register } = useAuth();
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log("Form submitted"); 
    const result = await register(formData);
    if (result.success) {
        setSuccess("Registered successfully");
        setError("");
    } else {
        setError(result.error ?? "Unknown error"); 
        setSuccess("");
    }
};

return (
    <div className="w-full max-w-xl flex flex-col items-center justify-center p-4">
      <div className="w-full p-8 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg">
            <div className="text-center mb-6">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="130"
                height="130"
                className="inline-block"
                viewBox="0 0 53 53"
            >
                <path
                fill="#e7eced"
                d="m18.613 41.552-7.907 4.313a7.106 7.106 0 0 0-1.269.903A26.377 26.377 0 0 0 26.5 53c6.454 0 12.367-2.31 16.964-6.144a7.015 7.015 0 0 0-1.394-.934l-8.467-4.233a3.229 3.229 0 0 1-1.785-2.888v-3.322c.238-.271.51-.619.801-1.03a19.482 19.482 0 0 0 2.632-5.304c1.086-.335 1.886-1.338 1.886-2.53v-3.546c0-.78-.347-1.477-.886-1.965v-5.126s1.053-7.977-9.75-7.977-9.75 7.977-9.75 7.977v5.126a2.644 2.644 0 0 0-.886 1.965v3.546c0 .934.491 1.756 1.226 2.231.886 3.857 3.206 6.633 3.206 6.633v3.24a3.232 3.232 0 0 1-1.684 2.833z"
                data-original="#e7eced"
                />
                <path
                fill="#556080"
                d="M26.953.004C12.32-.246.254 11.414.004 26.047-.138 34.344 3.56 41.801 9.448 46.76a7.041 7.041 0 0 1 1.257-.894l7.907-4.313a3.23 3.23 0 0 0 1.683-2.835v-3.24s-2.321-2.776-3.206-6.633a2.66 2.66 0 0 1-1.226-2.231v-3.546c0-.78.347-1.477.886-1.965v-5.126S15.696 8 26.499 8s9.75 7.977 9.75 7.977v5.126c.54.488.886 1.185.886 1.965v3.546c0 1.192-.8 2.195-1.886 2.53a19.482 19.482 0 0 1-2.632 5.304c-.291.411-.563.759-.801 1.03V38.8c0 1.223.691 2.342 1.785 2.888l8.467 4.233a7.05 7.05 0 0 1 1.39.932c5.71-4.762 9.399-11.882 9.536-19.9C53.246 12.32 41.587.254 26.953.004z"
                data-original="#556080"
                />
            </svg>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {[
                    { name: "firstName", type: "text", placeholder: "First Name" },
                    { name: "lastName", type: "text", placeholder: "Last Name" },
                    { name: "username", type: "text", placeholder: "Username" },
                    // { name: "phoneNumber", type: "text", placeholder: "Phone Number" },
                    // { name: "address", type: "text", placeholder: "Address" },
                    { name: "email", type: "email", placeholder: "Email" },
                    { name: "password", type: "password", placeholder: "Password" },
                        
                ].map(({ name, type, placeholder }) => (
                    <div key={name} className="relative">
                    <input
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        value={formData[name as keyof RegisterFormData]}
                        onChange={handleChange}
                        required
                        className="w-full text-sm text-gray-800 bg-white border-2 border-transparent focus:border-[#1E2772] pl-4 pr-4 py-3 rounded-md outline-none backdrop-blur-sm"
                    />
                    </div>
                ))}

                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full py-2.5 px-4 text-[15px] font-medium rounded-md text-white bg-[#1E2772] hover:bg-[#1e4272] focus:outline-none backdrop-blur-sm"
                    >
                        Register
                    </button>
                    <p className="text-sm mt-6 text-center text-white">
                        Already have an account?
                        <Link href="/login" className="text-[#1E2772] font-medium hover:underline ml-1 whitespace-nowrap">
                            Login here
                        </Link>
                    </p>
                </div>


                {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                {success && <p className="text-sm text-green-600 text-center">{success}</p>}
            </form>
        </div>
    </div>
  );
}
