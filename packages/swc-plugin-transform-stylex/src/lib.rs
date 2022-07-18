use serde::{Deserialize, Serialize};
use swc_plugin::{ast::*, plugin_transform, TransformPluginProgramMetadata};
use tracing::{info};

pub struct TransformVisitor;

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct PluginConfig {
    inject: Bool,
    enable_logging: Bool,
    use_all: Bool,
}

impl VisitMut for TransformVisitor {
    // Implement necessary visit_mut_* methods for actual custom transform.
    // A comprehensive list of possible visitor methods can be found here:
    // https://rustdoc.swc.rs/swc_ecma_visit/trait.VisitMut.html
    fn visit_mut_program(&mut self, n: &mut Program) {
        n.visit_mut_children_with (self);

        info!("program entry");
    }

    fn visit_mut_import_default_specifier(&mut self, n: &mut ImportDefaultSpecifier) {
        n.visit_mut_children_with(self); 

        info!("import default specifier");
    }
}

/// An example plugin function with macro support.
/// `plugin_transform` macro interop pointers into deserialized structs, as well
/// as returning ptr back to host.
///
/// It is possible to opt out from macro by writing transform fn manually via
/// `__transform_plugin_process_impl(
///     ast_ptr: *const u8,
///     ast_ptr_len: i32,
///     config_str_ptr: *const u8,
///     config_str_ptr_len: i32,
///     context_str_ptr: *const u8,
///     context_str_ptr_len: i32) ->
///     i32 /*  0 for success, fail otherwise.
///             Note this is only for internal pointer interop result,
///             not actual transform result */
///
/// if plugin need to handle low-level ptr directly. However, there are
/// important steps manually need to be performed like sending transformed
/// results back to host. Refer swc_plugin_macro how does it work internally.
#[plugin_transform]
pub fn process_transform(program: Program, _metadata: TransformPluginProgramMetadata) -> Program {
    //let config = serde_json::from_str::<PluginConfig>(&_metadata.plugin_config)
      //  .expect("invalid config for swc-plugin-transform-stylex");

    info!("{}", _metadata.plugin_config);
    
    program.fold_with(&mut as_folder(TransformVisitor))
}

