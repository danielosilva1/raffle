"use client";

import { FormDatePicker } from "@/components/form/form-date-picker";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { updateCampaign } from "@/lib/actions/update-campaign/update-campaign";
import { Schema, schema } from "@/lib/actions/update-campaign/types";
import Link from "next/link";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Info } from "lucide-react";
import { Campaign } from "@/generated/prisma";
import { FormSelect } from "@/components/form/form-select";
import { Button } from "@/components/ui/button";
import { CustomAlertDialog } from "@/components/custom-alert-dialog";
import { deleteCampaign } from "@/lib/actions/delete-campaign/delete-campaign";
import { redirect } from "next/navigation";

interface UpdateCampaignFormProps {
  campaign: Campaign;
}

export const UpdateCampaignForm = ({ campaign }: UpdateCampaignFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const onUpdate = async (data: Schema) => {
    const { success, message } = await updateCampaign(data);

    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const onDelete = async () => {
    const { success, message } = await deleteCampaign({
      campaignId: campaign.id,
    });

    if (success) {
      toast.success(message);
      redirect("/my-campaigns");
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="w-[80%] space-y-6 xl:max-w-2xl">
      <div className="w-full flex items-center space-x-4 p-4 bg-orange-200 rounded-sm text-neutral-600">
        <Info />
        <div className="flex flex-col space-y-3 text-sm">
          <span>
            Este é um projeto <span className="font-semibold">educativo</span> e{" "}
            <span className="font-semibold">sem fins lucrativos</span>
          </span>
          <span>
            A participação (apoio a uma campanha) é{" "}
            <span className="font-semibold">gratuita</span> e{" "}
            <span className="font-semibold">voluntária</span>, sem qualquer tipo
            de pagamento ou troca
          </span>
          <span>
            Ao criar uma campanha você{" "}
            <span className="font-semibold">concorda</span> com os termos acima
          </span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onUpdate)}
        className="w-full p-4 space-y-4 border border-blue-300 rounded-sm"
      >
        <input
          id="campaignId"
          hidden
          readOnly
          value={campaign.id}
          {...register("campaignId")}
        />
        <Controller
          name="title"
          control={control}
          defaultValue={campaign.title}
          render={({ field, fieldState }) => (
            <FormInput
              id="title"
              label="Título*"
              className="h-8 border border-blue-200"
              placeholder="Título da campanha..."
              value={field.value as string}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue={campaign.description}
          render={({ field, fieldState }) => (
            <FormTextarea
              id="description"
              label="Descrição*"
              className="border border-blue-200"
              placeholder="Descreva a campanha e a causa envolvida..."
              value={field.value as string}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />

        <div
          className="
            space-y-4
            md:flex md:justify-between md:space-x-10
          "
        >
          <FormInput
            id="organizerName"
            value={campaign.organizerName}
            readOnly
            label="Organizador(a)*"
            className="h-8 border border-blue-200 w-full"
            placeholder="Nome do(a) organizador(a)"
            error={errors.organizerName?.message}
            {...register("organizerName")}
          />

          <Controller
            name="targetSupporters"
            control={control}
            defaultValue={campaign.targetSupporters}
            render={({ field, fieldState }) => (
              <FormInput
                id="targetSupporters"
                label="Meta de apoiadores*"
                className="h-8 border border-blue-200 w-full"
                placeholder="Meta de apoiadores"
                value={field.value as string}
                onChange={(e) => {
                  const value = e.target.value;
                  const numbers = value.replace(/\D/g, "");
                  field.onChange(numbers);
                }}
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
            name="startDate"
            control={control}
            defaultValue={campaign.startDate}
            render={({ field, fieldState }) => (
              <FormDatePicker
                id="startDate"
                label="Data de início*"
                className="h-8 bg-transparent border border-blue-200 w-full hover:bg-transparent"
                placeholder="Escolha uma data"
                value={field.value as string}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="endDate"
            control={control}
            defaultValue={campaign.endDate ?? ""}
            render={({ field, fieldState }) => (
              <FormDatePicker
                id="endDate"
                label="Data de fim"
                className="h-8 bg-transparent border border-blue-200 w-full hover:bg-transparent"
                placeholder="Escolha uma data"
                value={field.value as string}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="status"
            control={control}
            defaultValue={campaign.status}
            render={({ field, fieldState }) => (
              <FormSelect
                id="status"
                label="Status*"
                placeholder="Selecione um status"
                className="h-8 bg-transparent border border-blue-200 w-full hover:bg-transparent"
                items={[
                  { label: "Ativa", value: "active" },
                  { label: "Finalizada", value: "closed" },
                  { label: "Cancelada", value: "cancelled" },
                ]}
                value={field.value as string}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
        </div>

        <div className="flex flex-col space-y-2 justify-end mt-6 md:flex-row md:space-x-8">
          <Link
            href="/"
            className="h-10 flex justify-center items-center bg-blue-300 text-white font-semibold rounded-md px-4 hover:bg-blue-300/70"
          >
            <span>Voltar</span>
          </Link>

          <CustomAlertDialog
            title="Confirma exclusão da campanha?"
            description="Essa ação não poderá ser desfeita."
            onConfirm={onDelete}
            confirmLabel="Continuar"
            cancelLabel="Cancelar"
          >
            <Button
              variant="default"
              size="lg"
              className="font-semibold bg-red-700 hover:bg-red-700/70"
            >
              Excluir
            </Button>
          </CustomAlertDialog>

          <FormSubmit
            label="Salvar"
            className="font-semibold px-6 bg-green-600 hover:bg-green-600/70"
            size="lg"
          />
        </div>
      </form>
    </div>
  );
};
