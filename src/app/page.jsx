"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { signIn, useSession, getProviders } from "next-auth/react";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password) {
      try {
        const res = await axios.post("/api/auth/login", { email, password });
        console.log("Results: ", res);
        if (res.status === 200) {
          sessionStorage.setItem("token", res.data.token);

          router.push("/dashboard");
        } else {
          alert(res.data.message || "Something went wrong.");
        }
      } catch (error) {
        console.error("Login Error: ", error);
        alert("Something went wrong. Please try again.");
      }
    } else {
      alert("Please provide both email and password.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center bg-black-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full"
            />
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              Login
            </Button>
          </div>

          <div className="mt-6">
            {providers &&
              Object.values(providers).map((provider) => (
                <Button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Sign in with {provider.name}
                </Button>
              ))}
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
