'use client';

import { Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';

interface CopyButtonProps {
  content: string;
}

export const CopyButton = ({ content }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const isContentEmpty = !content.trim();
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleCopy = async () => {
    const text = content.trim();

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);

      clearTimer();

      timerRef.current = setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      const _error = error as Error;
      toast.error(`Erro ao copiar mensagem: ${_error.message}`);
    }
  };

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, []);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="disable:opacity-50"
      disabled={isContentEmpty}
      onClick={handleCopy}
    >
      {isCopied ? (
        <>
          <Check className="w-4 h-4 text-green-400" />
          <span>Copiado</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>Copiar</span>
        </>
      )}
    </Button>
  );
};
