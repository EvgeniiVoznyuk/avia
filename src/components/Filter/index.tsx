import s from "./Filter.module.sass"
import { useDispatch, useSelector } from "react-redux"
import { selectTickets, setFilter } from "../../store/slices/ticketsSlice"
import { ChangeEvent } from "react"

const FILTER_OPTIONS = [
  {
    option: "all",
    optionTitle: "Всі",
  },
  {
    option: "no-stops",
    optionTitle: "Без пересадок",
  },
  {
    option: "one-stop",
    optionTitle: "1 пересадка",
  },
  {
    option: "two-stops",
    optionTitle: "2 пересадки",
  },
  {
    option: "three-stops",
    optionTitle: "3 пересадки",
  },
]

const Filter = () => {
  const { filters } = useSelector(selectTickets)
  const dispatch = useDispatch()

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter(event.target.value))
  }

  return (
    <div className={s.filter}>
      <h3 className={s.filter__title}>КІЛЬКІСТЬ ПЕРЕСАДОК</h3>
      <ul className={s.filter__list}>
        {FILTER_OPTIONS.map(({ optionTitle, option }) => (
          <li key={option} className={s.filter__item}>
            <label htmlFor={option}>
              <input
                type="checkbox"
                id={option}
                name="filter"
                value={option}
                onChange={handleFilterChange}
                checked={filters.includes(option)}
              />
              <span className={s.filter__item__checkmark} />
              <p>{optionTitle}</p>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Filter
