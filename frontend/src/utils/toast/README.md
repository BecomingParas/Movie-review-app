# Toast Utilities

Toast notification utilities for providing feedback to users.

## Features

- Multiple toast variants (success, error, warning, info)
- Customizable options
- Promise handling
- Loading states
- Type safety
- Consistent styling

## Basic Usage

```tsx
import { successToast, errorToast } from "@/utils/toast";

// Success notification
successToast("Operation completed successfully!");

// Error notification
errorToast("Something went wrong!");
```

## Toast Variants

### Success Toast

```tsx
successToast("Profile updated!");
```

### Error Toast

```tsx
errorToast("Failed to save changes");
```

### Warning Toast

```tsx
warningToast("Your session will expire soon");
```

### Info Toast

```tsx
infoToast("New features available!");
```

### Loading Toast

```tsx
const toastId = loadingToast("Processing...");
// Later
toast.dismiss(toastId);
```

## Promise Handling

```tsx
promiseToast(saveData(), {
  loading: "Saving changes...",
  success: "Changes saved!",
  error: "Failed to save changes",
});
```

## Customization

All toast functions accept custom options:

```tsx
successToast("Custom success", {
  duration: 5000,
  position: "top-center",
  className: "custom-toast",
});
```

## Integration with Error Handling

```tsx
try {
  await saveData();
  successToast("Data saved successfully!");
} catch (error) {
  errorToast(error.message);
}
```

## Default Configuration

- Duration: 4000ms (5000ms for errors)
- Position: bottom-right
- Custom styling per variant
- Responsive design

## Best Practices

1. Use appropriate variant for the message type
2. Keep messages concise and clear
3. Use consistent messaging patterns
4. Handle async operations with promiseToast
5. Customize duration based on message length

## Accessibility

- High contrast colors
- Sufficient display duration
- Screen reader support
- Keyboard dismissible
