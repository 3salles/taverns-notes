import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export const SessionForm = () => {
  return (
    <form action="" className="space-y-6">
      <header className="flex flex-wrapper gap-2 items-center mb-6 justify-end">
        <Button type="submit" size="sm">
          Salvar
        </Button>
      </header>

      <Input
        placeholder="Título da sessão"
        variant="transparent"
        size="lg"
        autoFocus
      />

      <Textarea
        placeholder="Digite o conteúdo da sessão..."
        variant="transparent"
        size="lg"
      />
    </form>
  );
};
