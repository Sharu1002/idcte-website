import { Suspense } from "react";
import Image from "next/image";
import PreviewLoginForm from "@/components/PreviewLoginForm";

export default function PreviewLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-900 px-4">
      <Image
        src="/images/brand/idcte-logo-white.png"
        alt="IDCTE"
        width={220}
        height={47}
        className="mb-10 h-10 w-auto"
      />
      <div className="w-full max-w-sm bg-white p-8">
        <h1 className="text-lg font-semibold text-brand-900">
          Site Preview
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          This site is not yet public. Enter the password shared with you to
          continue.
        </p>
        <div className="mt-6">
          <Suspense fallback={null}>
            <PreviewLoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
