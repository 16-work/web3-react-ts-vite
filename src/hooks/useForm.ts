import yup from '@/utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DefaultValues, FieldValue, Path, SetValueConfig, useForm as useReactForm } from 'react-hook-form';

/** Hook */
export const useForm = <T extends Record<string, any>>(schema: Record<string, yup.AnySchema>, defaultValues?: DefaultValues<T> | undefined) => {
  /** Retrieval */
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    trigger,
    setValue: changeValue,
    ...rest
  } = useReactForm<T>({
    resolver: yupResolver(yup.object(schema).required()) as any,
    defaultValues,
    mode: 'all',
  });

  /** Params */
  // 当前的错误信息
  const errorMsg = useMemo(() => {
    return (
      Object.values(errors)
        .map((error) => error?.message)
        .find(Boolean) || ''
    );
  }, [Object.values(errors)]);

  /** Actions */
  // 语言变化时刷新错误信息
  ahooks.updateEffect(() => {
    trigger();
  }, [t]);

  // 修改值
  const setValue = (name: Path<T>, value: FieldValue<T>, config?: SetValueConfig) => {
    return changeValue(name, value, { ...config, shouldValidate: config?.shouldValidate ?? true });
  };

  /** Return */
  return {
    fields: register,
    beforeSubmit: handleSubmit,
    errors,
    errorMsg,
    control,
    setValue,
    ...rest,
  };
};
