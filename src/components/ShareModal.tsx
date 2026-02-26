import { X, MessageCircle, Copy, Send, Instagram } from 'lucide-react';
import { toast } from 'sonner';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url?: string;
}

const ShareModal = ({ isOpen, onClose, title }: ShareModalProps) => {
  if (!isOpen) return null;

  const shareUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success('Link copiado!');
    onClose();
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(title + ' - ' + shareUrl)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="fixed inset-0 bg-foreground/40" />
      <div 
        className="relative bg-card rounded-t-2xl sm:rounded-2xl w-full max-w-md p-6 animate-fade-in-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-bold">Compartilhar</h3>
          <button onClick={onClose} className="min-h-touch min-w-[44px] flex items-center justify-center rounded-full hover:bg-muted">
            <X size={22} />
          </button>
        </div>

        <div className="space-y-2">
          <button onClick={handleWhatsApp} className="w-full min-h-[56px] flex items-center gap-4 px-4 rounded-xl hover:bg-muted transition-colors">
            <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white"><MessageCircle size={22} /></div>
            <span className="text-lg font-medium">WhatsApp</span>
          </button>
          <button onClick={handleCopyLink} className="w-full min-h-[56px] flex items-center gap-4 px-4 rounded-xl hover:bg-muted transition-colors">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center"><Copy size={22} /></div>
            <span className="text-lg font-medium">Copiar link</span>
          </button>
          <button onClick={() => { toast.info('Em breve!'); onClose(); }} className="w-full min-h-[56px] flex items-center gap-4 px-4 rounded-xl hover:bg-muted transition-colors">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center"><Send size={22} /></div>
            <span className="text-lg font-medium">Enviar para usuário</span>
          </button>
          <button onClick={() => { toast.info('Em breve!'); onClose(); }} className="w-full min-h-[56px] flex items-center gap-4 px-4 rounded-xl hover:bg-muted transition-colors">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white"><Instagram size={22} /></div>
            <span className="text-lg font-medium">Instagram / Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
