// TODOを新規追加するコンポーネント
import { Textarea, Button } from "@chakra-ui/react";

export const TodoAdd = ({ buttonText, inputEl, handleAddTodoListItem,
  placeholder, leftIcon }) => <>
    <Textarea ref={inputEl}
      placeholder={placeholder} bgColor="white"
      mt="8" borderColor="gray.400"
    />
    <Button onClick={handleAddTodoListItem}
      colorScheme="blue" leftIcon={leftIcon} mt="8"
    >
      {buttonText}
    </Button>
  </>