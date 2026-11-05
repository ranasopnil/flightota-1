import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

export type NotificationLevel = "info" | "success" | "warning" | "error";

export interface AppNotification {
  id: string;
  level: NotificationLevel;
  title: string;
  description?: string;
  read: boolean;
  createdAt: number;
}

export interface NotificationState {
  items: AppNotification[];
}

const initialState: NotificationState = { items: [] };

/** In-app notification centre (billing alerts, quota warnings, key events). Transient toasts use Sonner directly. */
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notificationAdded: {
      reducer(state, action: PayloadAction<AppNotification>) {
        state.items.unshift(action.payload);
        state.items = state.items.slice(0, 50);
      },
      prepare(input: { level: NotificationLevel; title: string; description?: string; createdAt: number }) {
        return { payload: { ...input, id: nanoid(), read: false } };
      },
    },
    notificationRead(state, action: PayloadAction<string>) {
      const item = state.items.find((n) => n.id === action.payload);
      if (item) item.read = true;
    },
    allNotificationsRead(state) {
      state.items.forEach((n) => {
        n.read = true;
      });
    },
    notificationsCleared(state) {
      state.items = [];
    },
  },
  selectors: {
    selectNotifications: (state) => state.items,
    selectUnreadCount: (state) => state.items.filter((n) => !n.read).length,
  },
});

export const { notificationAdded, notificationRead, allNotificationsRead, notificationsCleared } = notificationSlice.actions;
export const { selectNotifications, selectUnreadCount } = notificationSlice.selectors;
export default notificationSlice;
