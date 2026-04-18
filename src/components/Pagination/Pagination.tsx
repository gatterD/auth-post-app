import React from 'react';
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

const perPageOptions = [10, 25, 50];

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  perPage,
  onPageChange,
  onPerPageChange,
}) => {
  const pageNumbers: number[] = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <div className="pagination__per-page">
        <Text size="s" view="secondary">Элементов на странице:</Text>
        <div className="pagination__per-page-buttons">
          {perPageOptions.map(option => (
            <Button
              key={option}
              label={String(option)}
              view={perPage === option ? 'primary' : 'secondary'}
              size="xs"
              onClick={() => onPerPageChange(option)}
            />
          ))}
        </div>
      </div>
      
      <div className="pagination__controls">
        <Button
          label="←"
          view="secondary"
          size="s"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        />
        
        <div className="pagination__pages">
          {startPage > 1 && (
            <>
              <Button
                label="1"
                view={currentPage === 1 ? 'primary' : 'secondary'}
                size="s"
                onClick={() => onPageChange(1)}
              />
              {startPage > 2 && <Text size="s">...</Text>}
            </>
          )}
          
          {pageNumbers.map(page => (
            <Button
              key={page}
              label={String(page)}
              view={currentPage === page ? 'primary' : 'secondary'}
              size="s"
              onClick={() => onPageChange(page)}
            />
          ))}
          
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <Text size="s">...</Text>}
              <Button
                label={String(totalPages)}
                view={currentPage === totalPages ? 'primary' : 'secondary'}
                size="s"
                onClick={() => onPageChange(totalPages)}
              />
            </>
          )}
        </div>
        
        <Button
          label="→"
          view="secondary"
          size="s"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        />
      </div>
    </div>
  );
};