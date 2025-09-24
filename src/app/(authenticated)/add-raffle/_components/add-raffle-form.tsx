"use client";

import { FormCheckbox } from "@/components/form/form-checkbox";
import { FormCurrencyInput } from "@/components/form/form-currency-input";
import { FormDatePicker } from "@/components/form/form-date-picker";
import { FormInput } from "@/components/form/form-input";
import { FormPhoneInput } from "@/components/form/form-phone-input";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { createRaffle } from "@/lib/actions/create-raffle/create-raffle";
import { Schema, schema } from "@/lib/actions/create-raffle/types";
import Link from "next/link";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export const AddRaffleForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Schema) => {
    const { success, message } = await createRaffle(data);

    if (success) {
      reset();
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 w-[80%] space-y-4 border border-blue-300 rounded-sm
      xl:max-w-2xl"
    >
      <FormInput
        id="title"
        label="Título*"
        className="h-8 border border-blue-200"
        placeholder="Título da rifa..."
        error={errors.title?.message}
        {...register("title")}
      />
      <FormTextarea
        id="description"
        label="Descrição*"
        className="border border-blue-200"
        placeholder="Descreva o motivo da rifa, a causa envolvida e as regras para participar..."
        error={errors.description?.message}
        {...register("description")}
      />
      <FormTextarea
        id="award"
        label="Premiação*"
        className="border border-blue-200"
        placeholder="Descreva o que será premiado"
        error={errors.award?.message}
        {...register("award")}
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
          error={errors.organizerName?.message}
          {...register("organizerName")}
        />

        <Controller
          name="organizerPhoneNumber"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <FormPhoneInput
              id="organizerPhoneNumber"
              label="WhatsApp do(a) organizador(a)*"
              className="h-8 border border-blue-200"
              placeholder="(XX) 9XXXX-XXXX"
              value={String(field.value ?? "")}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
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
          error={errors.pixKey?.message}
          {...register("pixKey")}
        />
        <FormInput
          id="pixHolderName"
          label="Nome do(a) titular*"
          className="h-8 border border-blue-200"
          placeholder="Nome do(a) titular do PIX"
          error={errors.pixHolderName?.message}
          {...register("pixHolderName")}
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
          error={errors.numberQuantity?.message}
          {...register("numberQuantity")}
        />

        <Controller
          name="numberPrice"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <FormCurrencyInput
              id="numberPrice"
              label="Preço do número (R$)*"
              className="h-8 border border-blue-200"
              placeholder="0,00"
              value={field.value as string}
              onBlur={field.onBlur}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />
      </div>

      <div
        className="
            space-y-4
            md:flex md:justify-between md:space-x-10
          "
      >
        <Controller
          name="drawDate"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <FormDatePicker
              id="drawDate"
              label="Data do sorteio"
              className="h-8 bg-transparent border border-blue-200 w-full hover:bg-transparent"
              placeholder="Escolha uma data"
              value={field.value as string}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />

        <FormCheckbox
          id="allowCashPayment"
          label="Aceita pagamento em dinheiro"
          error={errors.allowCashPayment?.message}
          {...register("allowCashPayment")}
        />
      </div>

      <FormTextarea
        id="additionalInfo"
        label="Informações adicionais"
        className="border border-blue-200"
        placeholder="Informe sobre as formas de pagamento, envio de comprovante de pagamento..."
        error={errors.additionalInfo?.message}
        {...register("additionalInfo")}
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
