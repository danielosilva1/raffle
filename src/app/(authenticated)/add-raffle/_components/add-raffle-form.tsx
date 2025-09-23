"use client";

import { FormCheckbox } from "@/components/form/form-checkbox";
import { FormCurrencyInput } from "@/components/form/form-currency-input";
import { FormDatePicker } from "@/components/form/form-date-picker";
import { FormInput } from "@/components/form/form-input";
import { FormPhoneInput } from "@/components/form/form-phone-input";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { createRaffle } from "@/lib/actions/create-raffle/create-raffle";
import { FormState } from "@/lib/actions/create-raffle/types";
import Link from "next/link";
import { useActionState } from "react";

export const AddRaffleForm = () => {
  const [state, formAction] = useActionState<FormState, FormData>(
    createRaffle,
    {
      success: null,
      message: null,
      data: null,
      fieldErrors: {},
    }
  );

  return (
    <form
      action={formAction}
      className="p-4 w-[80%] space-y-4 border border-blue-300 rounded-sm
      xl:max-w-2xl"
    >
      <FormInput
        id="title"
        label="Título*"
        className="h-8 border border-blue-200"
        placeholder="Título da rifa..."
        errors={state.fieldErrors}
      />
      <FormTextarea
        id="description"
        label="Descrição*"
        className="border border-blue-200"
        placeholder="Descreva o motivo da rifa, a causa envolvida e as regras para participar..."
        errors={state.fieldErrors}
      />
      <FormTextarea
        id="award"
        label="Premiação*"
        className="border border-blue-200"
        placeholder="Descreva o que será premiado"
        errors={state.fieldErrors}
      />

      <div
        className="
            space-y-4
            md:flex md:justify-between md:space-x-10
          "
      >
        <FormInput
          id="organizerName"
          label="Organizador(a)*"
          className="h-8 border border-blue-200 w-full"
          placeholder="Nome do(a) organizador(a)"
          errors={state.fieldErrors}
        />

        <FormPhoneInput
          id="organizerPhoneNumber"
          label="WhatsApp do(a) organizador(a)*"
          className="h-8 border border-blue-200"
          placeholder="(XX) 9XXXX-XXXX"
          errors={state.fieldErrors}
        />
      </div>

      <div
        className="
            space-y-4
            md:flex md:justify-between md:space-x-10
          "
      >
        <FormInput
          id="pixKey"
          label="Chave PIX*"
          className="h-8 border border-blue-200 w-full"
          placeholder="Chave PIX para pagamento"
          errors={state.fieldErrors}
        />
        <FormInput
          id="pixHolderName"
          label="Nome do(a) titular*"
          className="h-8 border border-blue-200"
          placeholder="Nome do(a) titular do PIX"
          errors={state.fieldErrors}
        />
      </div>

      <div
        className="
            space-y-4
            md:flex md:justify-between md:space-x-10
          "
      >
        <FormInput
          id="numberQuantity"
          label="Quantidade de números*"
          className="h-8 border border-blue-200 w-full"
          placeholder="Quantidade de números"
          errors={state.fieldErrors}
        />
        <FormCurrencyInput
          id="numberPrice"
          label="Preço do número (R$)*"
          className="h-8 border border-blue-200"
          placeholder="0,00"
          errors={state.fieldErrors}
        />
      </div>

      <div
        className="
            space-y-4
            md:flex md:justify-between md:space-x-10
          "
      >
        <FormDatePicker
          id="drawDate"
          label="Data do sorteio"
          className="h-8 bg-transparent border border-blue-200 w-full hover:bg-transparent"
          placeholder="Escolha uma data"
          errors={state.fieldErrors}
        />
        <FormCheckbox
          id="allowCashPayment"
          label="Aceita pagamento em dinheiro"
          errors={state.fieldErrors}
        />
      </div>

      <FormTextarea
        id="additionalInfo"
        label="Informações adicionais"
        className="border border-blue-200"
        placeholder="Informe sobre as formas de pagamento, envio de comprovante de pagamento..."
        errors={state.fieldErrors}
      />

      <div className="flex flex-col space-y-2 justify-end mt-6 md:flex-row md:space-x-8">
        <Link
          href="/"
          className="h-10 flex justify-center items-center bg-blue-300 text-white font-semibold rounded-md px-4 hover:bg-blue-300/70"
        >
          <span>Voltar</span>
        </Link>

        <FormSubmit
          label="Criar"
          className="font-semibold px-6 bg-green-600 hover:bg-green-600/70"
          size="lg"
        />
      </div>
    </form>
  );
};
