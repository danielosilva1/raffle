import { FormCheckbox } from "@/components/form/form-checkbox";
import { FormCurrencyInput } from "@/components/form/form-currency-input";
import { FormDatePicker } from "@/components/form/form-date-picker";
import { FormInput } from "@/components/form/form-input";
import { FormPhoneInput } from "@/components/form/form-phone-input";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Criar rifa",
  description: "Crie uma rifa",
};

export default function AddRaffle() {
  return (
    <div className="w-full flex flex-col items-center pt-6 pb-6">
      <h1 className="mb-6 text-2xl text-blue-900">Criar rifa</h1>

      <form
        className="p-4 w-[80%] space-y-4 border border-blue-300 rounded-sm
      xl:max-w-2xl"
      >
        <FormInput
          id="title"
          label="Título*"
          className="border border-blue-200"
          placeholder="Título da rifa..."
        />
        <FormTextarea
          id="description"
          label="Descrição*"
          className="border border-blue-200"
          placeholder="Descreva o motivo da rifa, a causa envolvida e as regras para participar..."
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
            className="border border-blue-200 w-full"
            placeholder="Nome do(a) organizador(a)"
          />

          <FormPhoneInput
            id="organizerPhoneNumber"
            label="WhatsApp do(a) organizador(a)*"
            className="border border-blue-200"
            placeholder="(XX) 9XXXX-XXXX"
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
            className="border border-blue-200 w-full"
            placeholder="Chave PIX para pagamento"
          />
          <FormInput
            id="pixHolderName"
            label="Nome do(a) titular*"
            className="border border-blue-200"
            placeholder="Nome do(a) titular do PIX"
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
            className="border border-blue-200 w-full"
            placeholder="Quantidade de números"
          />
          <FormCurrencyInput
            id="numberPrice"
            label="Preço do número (R$)*"
            className="border border-blue-200"
            placeholder="0,00"
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
            className="bg-transparent border border-blue-200 w-full hover:bg-transparent"
            placeholder="Escolha uma data"
          />

          <FormCheckbox
            id="allowCashPayment"
            label="Aceita pagamento em dinheiro"
          />
        </div>

        <FormTextarea
          id="additionalInfo"
          label="Informações adicionais"
          className="border border-blue-200"
          placeholder="Informe sobre as formas de pagamento, envio de comprovante de pagamento..."
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
    </div>
  );
}
