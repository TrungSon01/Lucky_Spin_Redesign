import { useState } from "react";

type ConfirmOptions = {
  title?: string;
  message?: string;
};

export const useConfirm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({});
  const [resolveFn, setResolveFn] = useState<((value: boolean) => void) | null>(
    null,
  );

  const confirm = (opts: ConfirmOptions = {}) => {
    setIsOpen(true);
    setOptions(opts);

    return new Promise<boolean>((resolve) => {
      setResolveFn(() => resolve);
    });
  };

  const handleConfirm = () => {
    resolveFn?.(true);
    setIsOpen(false);
  };

  const handleCancel = () => {
    resolveFn?.(false);
    setIsOpen(false);
  };

  return {
    isOpen,
    options,
    confirm,
    handleConfirm,
    handleCancel,
  };
};
