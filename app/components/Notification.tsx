/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle, Calendar } from "lucide-react";

type NotificationType = "success" | "error" | "warning" | "info" | "appointment";

interface NotificationProps {
  message: string;
  type?: NotificationType;
  duration?: number;
  onClose: () => void;
  details?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const icons = {
  success: <CheckCircle2 className="w-5 h-5" />,
  error: <AlertCircle className="w-5 h-5" />,
  warning: <AlertTriangle className="w-5 h-5" />,
  info: <Info className="w-5 h-5" />,
  appointment: <Calendar className="w-5 h-5" />,
};

const colors = {
  success: "bg-emerald-100 border-emerald-400 text-emerald-700",
  error: "bg-red-100 border-red-400 text-red-700",
  warning: "bg-amber-100 border-amber-400 text-amber-700",
  info: "bg-blue-100 border-blue-400 text-blue-700",
  appointment: "bg-indigo-100 border-indigo-400 text-indigo-700",
};

export default function Notification({
  message,
  type = "info",
  duration = 5000,
  onClose,
  details,
  action,
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    if (duration) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-md mx-auto mt-4 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
      }`}
    >
      <div
        className={`border-l-4 rounded-lg shadow-lg p-4 flex flex-col ${colors[type]}`}
        role="alert"
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 pt-0.5">{icons[type]}</div>
          <div className="flex-1">
            <p className="font-medium">{getTitle(type)}</p>
            <p className="text-sm mt-1">{message}</p>
            
            {details && !expanded && (
              <button 
                onClick={toggleExpand} 
                className="text-sm underline mt-1 hover:font-medium"
              >
                Voir plus
              </button>
            )}
          </div>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Fermer la notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        {expanded && details && (
          <div className="mt-3 ml-8 text-sm border-t pt-2 border-opacity-20 border-gray-500">
            <p>{details}</p>
            <button 
              onClick={toggleExpand} 
              className="text-xs underline mt-1 hover:font-medium"
            >
              Voir moins
            </button>
          </div>
        )}
        
        {action && (
          <div className="mt-3 ml-8">
            <button
              onClick={action.onClick}
              className="px-3 py-1 text-sm bg-white rounded-md shadow-sm hover:shadow-md transition-shadow"
            >
              {action.label}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function getTitle(type: NotificationType): string {
  const titles = {
    success: "Succès",
    error: "Erreur",
    warning: "Avertissement",
    info: "Information",
    appointment: "Rendez-vous",
  };
  return titles[type];
}