import cn from "classnames"
import s from "./Tabs.module.sass"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { selectTickets, setSort } from "../../store/slices/ticketsSlice";

const TABS = [
  {
    tabTitle: "найдешевший",
    tabValue: "cheapest",
  },
  {
    tabTitle: "найшвидший",
    tabValue: "fastest",
  },
  {
    tabTitle: "оптимальний",
    tabValue: "optimal",
  },
]

interface TabProps {
  tabTitle: string
  tabValue: string
  isActive: boolean
  handleChange: (s: string) => void
}

const Tab = ({ tabTitle, tabValue, isActive, handleChange }: TabProps) => {
  const tabClassNames = cn(`${s.tabs__tab}`, {
    [s['tabs__tab--active']]: isActive,
  })

  return (
    <button className={tabClassNames} onClick={() => handleChange(tabValue)}>
      {tabTitle}
    </button>
  )
}

const Tabs = () => {
  const {  sort } = useSelector(selectTickets)
  const dispatch = useDispatch();

  const handleTabChange = (sortType: string) => {
    dispatch(setSort(sortType));
  };

  return (
    <div className={s.tabs}>
      {TABS.map((tab) => (
        <Tab
          key={tab.tabValue}
          isActive={sort === tab.tabValue}
          handleChange={(tabValue) => handleTabChange(tabValue)}
          {...tab}
        />
      ))}
    </div>
  )
}

export default Tabs
