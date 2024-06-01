import s from "./TicketCard.module.sass"
import { Ticket } from "types"
import { ticketLogos } from "constants/ticketsLogo"
import { v4 as uuidv4 } from "uuid"
import { useCallback } from "react"

const TicketCard = ({ price, details, logo }: Ticket) => {
  const getTransfersTitle = useCallback((transfersCount: number) => {
    switch (transfersCount) {
      case 0:
        return "без пересадок"
      case 1:
        return "1 пересадка"
      default:
        return `${transfersCount} пересадки`
    }
  }, [])

  return (
    <div className={s.card}>
      <div className={s.card__header}>
        <div className={s.card__price}>{price} $</div>
        <img src={ticketLogos[logo]} alt="Airline logo" />
      </div>
      <div className={s.card__details}>
        {details.map(({ path, time, travelTime, transfers }) => (
          <div className={s.card__details_row} key={uuidv4()}>
            <div className={s.card__details_col}>
              <p className={s.card__col_title}>{path}</p>
              <p className={s.card__col_info}>{time}</p>
            </div>

            <div className={s.card__details_col}>
              <p className={s.card__col_title}>в дорозі</p>
              <p className={s.card__col_info}>{travelTime}</p>
            </div>

            <div className={s.card__details_col}>
              <p className={s.card__col_title}>
                {getTransfersTitle(transfers.length)}
              </p>
              <p className={s.card__col_info}>{transfers.join(", ")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TicketCard
