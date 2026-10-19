import { create } from "zustand";
import { PaymentMethodType } from "src/types/base";

// Типы модальных окон
export type ModalType = PaymentMethodType | null;

// Интерфейс состояния модальных окон
interface WithdrawModalState {
  // Текущее открытое модальное окно
  activeModal: ModalType;
  
  // Методы для управления модальными окнами
  openModal: (modalType: PaymentMethodType) => void;
  closeModal: () => void;
  
  // Проверка, открыто ли конкретное модальное окно
  isModalOpen: (modalType: PaymentMethodType) => boolean;
}

// Создаем store с использованием Zustand
export const useWithdrawModalStore = create<WithdrawModalState>((set, get) => ({
  activeModal: null,
  
  openModal: (modalType: PaymentMethodType) => {
    set({ activeModal: modalType });
  },
  
  closeModal: () => {
    set({ activeModal: null });
  },
  
  isModalOpen: (modalType: PaymentMethodType) => {
    return get().activeModal === modalType;
  },
}));
