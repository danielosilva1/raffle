"use client";

import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addCampaignSupport } from "@/lib/actions/add-campaign-support/add-campaign-support";
import { useUser } from "@clerk/nextjs";
import { PopoverClose } from "@radix-ui/react-popover";
import { HandHeart } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

interface SupportPopoverProps {
  campaignId: string;
}

export function SupportPopover({ campaignId }: SupportPopoverProps) {
  const { user } = useUser();
  const closeRef = useRef<HTMLButtonElement>(null);

  const onAddSupport = async (formData: FormData) => {
    const supportMessage = formData.get("message") as string;

    if (!user) {
      toast.error("Erro ao apoiar campanha");
      return;
    }

    const { success, message } = await addCampaignSupport({
      supporterUserId: user.id,
      supporterName: user.fullName ?? "Usuário sem nome registrado",
      message: supportMessage,
      campaignId,
    });

    if (success) {
      toast.success(message);
      closeRef.current?.click();
    } else {
      toast.error(message);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          size="lg"
          className="font-bold bg-blue-800 hover:bg-blue-800/70"
        >
          <HandHeart />
          Apoiar campanha
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Adicionar mensagem</h4>
            <p className="text-muted-foreground text-sm">
              Deixe uma mensagem de apoio à campamha
            </p>
          </div>
          <form className="space-y-4" action={onAddSupport}>
            <FormTextarea
              id="message"
              placeholder="Digite aqui uma mensagem de apoio à campanha (opicional)"
            />

            <FormSubmit
              label="Apoiar"
              className="bg-green-800 font-semibold hover:bg-green-800/70"
            />
          </form>
        </div>
        <PopoverClose className="hidden" ref={closeRef} />
      </PopoverContent>
    </Popover>
  );
}
