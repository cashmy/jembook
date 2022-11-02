import './add-cell.css';
import { useActions } from '../hooks/use-actions';

interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}


const AddCell: React.FC<AddCellProps> = ({ forceVisible, previousCellId }) => {
  const { insertCellAfter } = useActions();

  return (
    <div className={`add-cell ${forceVisible && 'showInitial'} `}>
      <div className='add-buttons'>
        {/* Code Button */}
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(previousCellId, 'code')}>
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Code</span>
        </button>

{/* Text Button */}
        <button 
          onClick={() => insertCellAfter(previousCellId, 'text')}
          className="button is-rounded is-primary is-small">
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className='divider'></div>
    </div>
  )
};

export default AddCell;