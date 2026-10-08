import React from "react";
import { qnaInputClass, qnaPrimaryButtonClass } from "./styles";

interface PinGateProps {
  id: string;
  title: string;
  description: string;
  buttonLabel: string;
  password: string;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  error?: string;
}

const PinGate: React.FC<PinGateProps> = ({
  id,
  title,
  description,
  buttonLabel,
  password,
  onPasswordChange,
  onSubmit,
  isSubmitting,
  error,
}) => (
  <section className="rounded-2xl border border-[#D8E8D1] bg-[#F6FAF4] p-5 sm:p-8">
    <div className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E3F1DC] text-primary">
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="10" width="16" height="11" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
      </span>
      <div>
        <h2 className="text-lg font-semibold text-[#244224]">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">{description}</p>
      </div>
    </div>
    <form onSubmit={onSubmit} className="mt-6">
      {/* <label htmlFor={id} className="mb-2 block text-sm font-semibold text-gray-700">
        비밀번호 <span className="font-normal text-gray-500">· 숫자 4자리</span>
      </label> */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id={id}
          type="password"
          inputMode="numeric"
          pattern="[0-9]{4}"
          minLength={4}
          maxLength={4}
          required
          autoComplete="off"
          placeholder="숫자 4자리 입력"
          value={password}
          onChange={(event) => onPasswordChange(event.target.value)}
          className={`${qnaInputClass} sm:max-w-[240px]`}
        />
        <button type="submit" disabled={isSubmitting} className={qnaPrimaryButtonClass}>
          {isSubmitting ? "확인 중..." : buttonLabel}
        </button>
      </div>
      {error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}
    </form>
  </section>
);

export default PinGate;
