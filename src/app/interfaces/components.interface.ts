export interface SubmenuItem {
    title: string;
    url: string;
  }
  export interface MenuItem {
    title: string;
    icon: string;
    submenu?: SubmenuItem[];

  }