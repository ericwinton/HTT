module.exports = {
   fields: [
       {
          label: "Name",
          name: "name",
          type: "text",
          dataType: "string",
          required: true
       },
       {
          label: "Slug",
          name: "slug",
          type: "text",
          dataType: "string",
          required: true
       },
       {
          label: "Permissions",
          name: "permissions",
          type: "relationship",
          rel_model: "permissions",
          rel_type: "many-to-many",
          rel_display_key: "name",
          required: true
       }
    ]
 }