import { renderHook, screen, waitFor } from '@testing-library/react';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { useDropZone } from '.';
import { renderSetup } from '../../_internal/test/renderSetup';

const TestComponent = ({ onDrop }: { onDrop: (file: File[]) => void }) => {
  const { ref, isDragOver } = useDropZone<HTMLDivElement>(onDrop);

  return (
    <>
      <div ref={ref} role="dropZone">
        DropZone
      </div>
      <div role={'isDragOver'}>{`${isDragOver}`}</div>
    </>
  );
};
describe('useDropZone', () => {
  const mockOnDrop = vi.fn();

  beforeEach(() => {
    mockOnDrop.mockClear();
  });

  it('초기 상태에서는 isDragOver가 false여야 합니다', () => {
    const { result } = renderHook(() => useDropZone(mockOnDrop));
    expect(result.current.isDragOver).toBeFalsy();
  });

  it('dragenter 이벤트 발생 시 isDragOver가 true로, dragleave 이벤트 발생 시 false로 변경되어야 합니다', async () => {
    renderSetup(<TestComponent onDrop={vi.fn()} />);

    const dropZone = screen.getByRole('dropZone');

    await waitFor(() => {
      const dragEnterEvent = new Event('dragenter');
      dropZone.dispatchEvent(dragEnterEvent);
    });

    expect(screen.getByRole('isDragOver')).toHaveTextContent('true');

    await waitFor(() => {
      const dragLeaveEvent = new Event('dragleave');
      dropZone.dispatchEvent(dragLeaveEvent);
    });

    expect(screen.getByRole('isDragOver')).toHaveTextContent('false');
  });

  it('파일을 Drop했을 때 onDrop 콜백이 호출되어야 합니다.', async () => {
    const mockFileList: File[] = [];
    const file1 = new File(['text1.text'], 'text1.text');
    const file2 = new File(['text2.text'], 'text2.text');
    const files = [file1, file2];

    renderSetup(
      <TestComponent
        onDrop={(fileList) => {
          mockFileList.push(...fileList);
        }}
      />
    );
    const dropZone = screen.getByRole('dropZone');

    await waitFor(() => {
      const dropEvent = new Event('drop');

      Object.defineProperty(dropEvent, 'dataTransfer', {
        value: { files },
      });
      dropZone.dispatchEvent(dropEvent);
    });

    expect(mockFileList).toHaveLength(2);

    expect(mockFileList[0]).toBe(file1);
    expect(mockFileList[0].name).toBe('text1.text');

    expect(mockFileList[1]).toBe(file2);
    expect(mockFileList[1].name).toBe('text2.text');
  });
});
