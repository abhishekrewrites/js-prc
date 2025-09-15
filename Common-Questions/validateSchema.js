function validateSchema(schema, val) {
  const valType = typeof val;
  const schemaType = typeof schema;

  // Handle primitive type validation
  if (schemaType === "string") {
    return valType === schema;
  }

  // Handle object/array validation
  if (schemaType === "object" && schema !== null) {
    // Null values don't match object schemas
    if (val === null || valType !== "object") {
      return false;
    }

    // Array validation
    if (Array.isArray(schema)) {
      if (!Array.isArray(val)) {
        return false;
      }

      // Empty schema array means any array is valid
      if (schema.length === 0) {
        return true;
      }

      // Validate each element against the first schema element
      return val.every((value) => validateSchema(schema[0], value));
    }

    // Object validation
    if (Array.isArray(val)) {
      return false;
    }

    const schemaKeys = Object.keys(schema);
    const valKeys = Object.keys(val);

    // Check if all schema keys exist in val
    for (let key of schemaKeys) {
      if (!(key in val)) {
        return false;
      }
    }

    // Check if val has any extra keys not in schema
    for (let key of valKeys) {
      if (!(key in schema)) {
        return false;
      }
    }

    // Validate each property recursively
    for (let key of schemaKeys) {
      if (!validateSchema(schema[key], val[key])) {
        return false;
      }
    }

    return true;
  }

  return false;
}

console.log(
  validateSchema(
    { name: "string", hobbies: ["string"] },
    { name: "Ab", hobbies: ["---"] }
  )
);
